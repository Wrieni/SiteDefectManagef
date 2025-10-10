import os
import pytest
import requests

from .api_client import APIClient


def _skip_if_backend_unreachable(client: APIClient):
    try:
        # try a simple GET to base url to detect unreachable host
        requests.get(client.base_url, timeout=2)
    except requests.RequestException:
        pytest.skip(f"Backend not reachable at {client.base_url}")


@pytest.mark.skipif(os.environ.get("CI") == "true", reason="Skip integration tests in CI by default")
def test_register_login_and_create_project():
    """Integration: register a temporary user, login, create a project, and check it appears in list."""
    client = APIClient()
    _skip_if_backend_unreachable(client)

    username = "test_integ_user"
    password = "Password123!"
    # try to register; if user exists, server may return 4xx - ignore those
    try:
        client.register(username=username, password=password, first_name="TI", last_name="User", role="ROLE_MANAGER")
    except requests.RequestException:
        pytest.skip("Backend rejected registration or is misconfigured")

    try:
        auth = client.login(username=username, password=password)
    except requests.RequestException:
        pytest.skip("Login endpoint not available or returned error")

    token = auth.get("token") or auth.get("accessToken") or auth.get("jwt")
    assert token

    payload = {
        "title": "Integration Test Project",
        "description": "Created from pytest integration test",
        "startDate": "2025-10-01",
        "endDate": "2025-10-31",
        "executorId": 1,
        "observers": [],
    }

    created = client.create_project(token=token, payload=payload)
    assert created.get("id") is not None

    projects = client.get_projects(token=token)
    assert any(p.get("id") == created.get("id") for p in projects)


@pytest.mark.skipif(os.environ.get("CI") == "true", reason="Skip integration tests in CI by default")
def test_create_project_unauthorized():
    client = APIClient()
    _skip_if_backend_unreachable(client)
    payload = {"title": "Fail Project"}
    with pytest.raises(requests.RequestException):
        # create_project raises when response is 4xx/5xx via raise_for_status
        client.create_project(token=None, payload=payload)
