import os
from pydantic_settings import BaseSettings
from functools import lru_cache

DOTENV = os.path.join(os.path.dirname(__file__), ".env")


class Settings(BaseSettings):
    ENV_MODE: str = "development"
    APP_NAME: str = "Image Scanner API"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = (
        "An API to scan and enhance images to look like scanned documents."
    )

    CORS_ORIGINS: list[str] = [
        "http://localhost",
        "http://localhost:8000",
        "http://localhost:5173",
    ]
    CORS_METHODS: list[str] = ["OPTIONS", "GET", "POST", "PUT", "DELETE"]
    CORS_HEADERS: list[str] = ["*"]

    AUTO_RELOAD: bool = True
    LOG_LEVEL: str = "info"

    class Config:
        env_file = DOTENV
        env_file_encoding = "utf-8"
        env_ignore_empty = True
        env_nested_delimiter = "__"
        extra = "allow"


class DevelopmentSettings(Settings):
    DEBUG: bool = True


class ProductionSettings(Settings):
    DEBUG: bool = False


def get_config() -> Settings:
    """
    Get the appropriate settings based on the environment mode.
    """
    if Settings().ENV_MODE.lower() == "production":
        return ProductionSettings()

    return DevelopmentSettings()


@lru_cache
def get_settings() -> Settings:
    """
    Get cached settings instance.
    """
    return get_config()
