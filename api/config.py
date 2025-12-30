from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    ENV_MODE: str = "development"
    APP_NAME: str = "Image Scanner API"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = (
        "An API to scan and enhance images to look like scanned documents."
    )


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
