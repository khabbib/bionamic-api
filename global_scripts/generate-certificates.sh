#!/bin/bash

# Create the certificates directory if it doesn't exist
mkdir -p certificates

# Generate a default self-signed certificate
openssl req -x509 -nodes -newkey rsa:4096 -keyout certificates/server.key -out certificates/server.crt -subj "/CN=localhost" -days 365

echo "Default certificate generated successfully in the 'certificates' directory."

