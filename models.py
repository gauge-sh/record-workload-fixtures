from typing import Any
from pydantic import BaseModel, ConfigDict, Field

class Variant(BaseModel):
    model_config = ConfigDict(extra='allow')
    sku: str
    attributes: dict[str, Any]
    stock: int

class Block(BaseModel):
    model_config = ConfigDict(extra='allow')
    id: str
    type: str
    data: dict[str, Any]

class Entry(BaseModel):
    model_config = ConfigDict(extra='allow')
    id: str = Field(min_length=1)
    ownerId: str = Field(min_length=1)
    status: str = Field(min_length=1)
    createdAt: str = Field(min_length=1)
    title: str = Field(min_length=1)
    attributes: dict[str, Any]
    category: str | None = None
    variants: list[Variant] | None = None
    schemaVersion: int | None = None
    blocks: list[Block] | None = None
