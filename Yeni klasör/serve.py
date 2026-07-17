import http.server
import socketserver
import os
import mimetypes

# Fix Windows registry MIME-type mapping bug for ES Modules
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

PORT = 8000
DIRECTORY = "dist"

class SafeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent caching for development server
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

# Allow port reuse to avoid 'Address already in use' errors
socketserver.TCPServer.allow_reuse_address = True

print(f"Starting server on port {PORT} serving directory: {DIRECTORY}")
with socketserver.TCPServer(("", PORT), SafeHandler) as httpd:
    print(f"Server is running at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
