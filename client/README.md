# Client

Frontend application for **courses-no-one-asked-for (CNOAF)**.

The client is built using **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** to provide a modern and responsive user interface for the platform.

<video src="../assets/client-ui-demo.mp4" controls></video>

## Technologies Used

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Vite

## Setup

Clone the repository and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update the API Gateway base URL:

```env
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com
```
