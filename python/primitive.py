from dataclasses import dataclass, field

@dataclass
class Vector3:
    x: float = field(default=0.0)
    y: float = field(default=0.0)
    z: float = field(default=0.0)

@dataclass
class Color3:
    r: float = field(default=0.0)
    g: float = field(default=0.0)
    b: float = field(default=0.0)