## CS514 Database Project - Rate My Class

techstack being determined

# TO RUN THIS CODE:

You will need two terminals for this. Leave both running once commands entered.

### FIRST: In the first terminal, navigate to the api folder in this project:

- `cd ~/cs514-database-project/api`
  - or if you named the project root something else, use that: `cd ~/<project_root>/api`

Install project dependencies (only need to do once):

- `uv sync`

Start the development server for the API:

- `uv run fastapi dev main.py`

(Optional) To open the API docs:

- in browser, navigate to `http://127.0.0.1:8000/docs`



### SECOND: Open a second terminal window, and navigate to the project root:

- `cd ~/cs514-database-project` 
  - or if you named the project root something else, use that: `cd ~/<project_root>`

Install npm modules (only need to do this once):

- `npm install`

Start the website development server:

- `npm run dev`

Open the site in browser

- in browser, navigate to `http://localhost:3000/`

