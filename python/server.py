from enum import Enum

class ProxySubdomain(str, Enum):
    SUPABASE_API = "supabase-api"
    SUPABASE_STORAGE = "supabase-storage"
    SUPABASE_GRAPHQL = "supabase-graphql"
    SUPABASE_INBUCKET = "supabase-inbucket"
    SUPABASE_STUDIO = "supabase-studio"
