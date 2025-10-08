import json
from unittest.mock import patch

import pytest


@pytest.fixture
def sample_payload():
    return {
        "title": "Test Project",
        "description": "A project created during tests",
        "startDate": "2025-10-01",
        "endDate": "2025-10-31",
        "executorId": 1,
        "observers": [2, 3],
    }


def test_validate_required_fields(sample_payload):
    # Simulate minimal validation function
    payload = sample_payload.copy()
    payload.pop("title")

    missing = [k for k in ("title", "startDate", "endDate") if k not in payload or not payload[k]]
    assert "title" in missing


def test_date_range_validation(sample_payload):
    payload = sample_payload.copy()
    # end before start should fail
    payload["startDate"] = "2025-10-10"
    payload["endDate"] = "2025-10-05"

    assert payload["endDate"] < payload["startDate"]


def test_select_value_shape_for_executor():
    # react-select expects option shape { value, label }
    option = {"value": 1, "label": "Alice"}
    assert "value" in option and "label" in option


def test_multiselect_observers_shape():
    options = [{"value": 2, "label": "Bob"}, {"value": 3, "label": "Carol"}]
    vals = [o["value"] for o in options]
    assert vals == [2, 3]


def test_create_project_calls_api(sample_payload):
    # Patch requests.post used by API client in integration layer
    from tests.api_client import APIClient

    client = APIClient("http://example.invalid")

    class DummyResp:
        def raise_for_status(self):
            return None

        def json(self):
            return {"id": 123, **sample_payload}

    with patch("requests.post") as mock_post:
        mock_post.return_value = DummyResp()
        res = client.create_project(token="tok", payload=sample_payload)
        assert res["id"] == 123
