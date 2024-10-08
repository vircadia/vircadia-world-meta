from datetime import datetime
from enum import Enum
from typing import Any, Dict
from dataclasses import dataclass
from .primitive import Vector3, Color3

class Profile:
    class Role(str, Enum):
        GUEST = "guest"
        MEMBER = "member"
        ADMIN = "admin"

class WebRTC:
    class SignalType(str, Enum):
        AGENT_OFFER = "agent-agent-offer-packet"
        AGENT_ANSWER = "agent-agent-answer-packet"
        AGENT_ICE_CANDIDATE = "agent-agent-ice-candidate-packet"

class Audio:
    DEFAULT_PANNER_OPTIONS = {
        "panningModel": "HRTF",
        "distanceModel": "inverse",
        "refDistance": 1,
        "maxDistance": 10000,
    }

@dataclass
class Presence:
    agentId: str
    position: Vector3
    orientation: Vector3
    lastUpdated: datetime

    @classmethod
    def parse(cls, obj: Dict[str, Any]) -> 'Presence':
        return cls(
            agentId=obj['agentId'],
            position=Vector3(**obj['position']),
            orientation=Vector3(**obj['orientation']),
            lastUpdated=datetime.fromisoformat(obj['lastUpdated'])
        )

