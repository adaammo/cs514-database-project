-- Commands --
uv sync -> run this to add all new dependices and sync your local setup with the uv.lock file and venv

uv run fastapi dev main.py -> run this to start the development server for the api


-- Layout -- 
Main.py holds all the final information. All sub routers will be imported here and attached, along with the cors stuff

* router 
router will hold sub routers such as:
/endpoint1
this allows for more code readibility if it matters in this project

* schemas
this will hold types using the pydantic modeling library

* services 
this will hold the actual major code like SQL writes and reads and other work
