use Mix.Config

database_url = System.get_env("DATABASE_URL") || "ecto://postgres:postgres@localhost/chat_api_dev"
pool_size = String.to_integer(System.get_env("POOL_SIZE") || "10")

require_db_ssl =
  case System.get_env("REQUIRE_DB_SSL") do
    "true" -> true
    "false" -> false
    _ -> true
  end

# Do not print debug messages in production
config :logger, level: :info
