from pydantic import BaseModel, Field

class Vector3(BaseModel):
    x: float = Field(default=0)
    y: float = Field(default=0)
    z: float = Field(default=0)

class Color3(BaseModel):
    r: float = Field(default=0)
    g: float = Field(default=0)
    b: float = Field(default=0)