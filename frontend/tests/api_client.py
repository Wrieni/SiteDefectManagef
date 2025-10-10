import os


class APIClient:
    """Minimal HTTP client used by tests to call the backend API.

    This is intentionally small and sync-only so tests are simple.
    Base URL can be set via the SITE_API_BASE environment variable (default http://localhost:8080).
    """

    def __init__(self, base_url: str | None = None):
        self.base_url = base_url or os.environ.get("SITE_API_BASE", "http://localhost:8080")

    def _url(self, path: str) -> str:
        return f"{self.base_url.rstrip('/')}{path}"

    def login(self, username: str, password: str) -> dict:
        import requests

        resp = requests.post(self._url("/api/auth"), json={"username": username, "password": password})
        resp.raise_for_status()
        return resp.json()

    def register(self, username: str, password: str, first_name: str, last_name: str, role: str = "ROLE_USER") -> dict:
        import requests

        payload = {
            "username": username,
            "password": password,
            "firstName": first_name,
            "lastName": last_name,
            "role": role,
        }
        resp = requests.post(self._url("/api/auth/register"), json=payload)
        resp.raise_for_status()
        return resp.json()

    def create_project(self, token: str, payload: dict) -> dict:
        import requests

        headers = {"Authorization": f"Bearer {token}"} if token else {}
        resp = requests.post(self._url("/api/projects"), json=payload, headers=headers)
        resp.raise_for_status()
        return resp.json()

    def get_projects(self, token: str | None = None) -> list:
        import requests

        headers = {"Authorization": f"Bearer {token}"} if token else {}
        resp = requests.get(self._url("/api/projects"), headers=headers)
        resp.raise_for_status()
        return resp.json()
