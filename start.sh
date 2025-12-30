#!/bin/bash

# Start both API and Client servers

echo "Starting Image Scanner application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Start API server
echo -e "${BLUE}Starting API server...${NC}"
cd "$SCRIPT_DIR/api"

# Activate virtual environment
if [ -d ".venv" ]; then
  source .venv/bin/activate
else
  echo -e "${BLUE}Virtual environment not found, creating one...${NC}"
  python3 -m venv .venv
  source .venv/bin/activate
  echo -e "${GREEN}Installing dependencies...${NC}"
  pip install -r requirements.txt
fi

python3 app.py &
API_PID=$!
echo -e "${GREEN}API server started (PID: $API_PID)${NC}"
echo ""

# Wait a moment for API to start
sleep 2

# Start Client server
echo -e "${BLUE}Starting Client server...${NC}"
cd "$SCRIPT_DIR/client"
npm run dev &
CLIENT_PID=$!
echo -e "${GREEN}Client server started (PID: $CLIENT_PID)${NC}"
echo ""

echo -e "${GREEN}Both servers are running!${NC}"
echo "API: http://localhost:8000 (adjust port as needed)"
echo "Client: http://localhost:5173 (Vite default)"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Trap SIGINT and kill both processes
trap "kill $API_PID $CLIENT_PID 2>/dev/null; echo 'Servers stopped.'; exit 0" SIGINT

# Wait for both processes
wait
