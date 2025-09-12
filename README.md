# Tickr | Stock Tracker

A full-stack web application for tracking software and SWE stocks with end-of-day market data. Built with Next.js, Express.js, and Docker.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Installation

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- MongoDB database
- Alpha Vantage API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/usergaia/Tickr.git
   cd Tickr
   ```

2. **Install dependencies**
   ```bash
   # Server dependencies
   cd server
   npm install
   
   # Client dependencies
   cd client
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

5. **Or run individually**
   ```bash
   # Terminal 1 - Server
   cd server
   npm run dev
   
   # Terminal 2 - Client
   cd client
   npm run dev
   ```

## Environment Variables

### Server (.env)
Create a `.env` file in the `server` directory:

```env
MongoDB_URI=your_mongodb_connection_string
AV_API=your_alpha_vantage_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Client (.env)
Create a `.env` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:1000
```

For production deployment, set `NEXT_PUBLIC_API_URL` to your deployed server URL.

## Usage

### Development
- **Client**: http://localhost:3000
- **Server**: http://localhost:1000
- **API Health Check**: http://localhost:1000/health

### Docker
- **Client**: http://localhost:3000
- **Server**: http://localhost:1000

### Available Scripts

**Server:**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
```

**Client:**
```bash
npm run dev     # Start development server with Turbopack
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## Features

- 📈 **End-of-Day Stock Data** - Track software and technology stocks with daily market data
- 🚀 **Top Gainers** - View latest stocks who had the highest gains
- 💰 **Highest Close Prices** - Monitor highest performing stocks
- ⚡ **Fast Performance** - Redis caching and client-side optimization
- 🐳 **Docker Support** - Easy deployment and development
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔄 **Auto-refresh** - Daily data updates with caching [wip]

## Tech Stack

**Frontend:**
- Next.js 15.5.2 with Turbopack
- React 19
- TypeScript
- Tailwind CSS
- Chart.js for data visualization

**Backend:**
- Express.js
- TypeScript
- MongoDB with Mongoose
- Redis (Upstash) for caching
- Alpha Vantage API integration

**DevOps:**
- Docker & Docker Compose
- GitHub Actions CI/CD
- Vercel (client deployment)
- Render (server deployment)

## API Endpoints

### Stock Data
- `GET /stocks` - Get all tracked stocks
- `GET /stocks/:symbol` - Get specific stock data
- `GET /health` - Health check endpoint

### Response Format
```json
{
  "_id": "string",
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "historical": [
    {
      "date": "2025-09-12",
      "close": 150.25,
      "open": 149.50,
      "high": 151.00,
      "low": 148.75,
      "volume": 50000000
    }
  ],
  "lastRefreshed": "2025-09-12T10:00:00Z",
  "timezone": "US/Eastern"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources Used

### API Documentation
- **[Alpha Vantage API Documentation](https://www.alphavantage.co/documentation/)** - Complete API reference and examples

### Database & Caching
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Free MongoDB hosting
- **[Upstash Redis](https://upstash.com/)** - Serverless Redis for caching

### Deployment Platforms
- **[Vercel](https://vercel.com/docs)** - Deploy Next.js applications
- **[Render](https://render.com/docs)** - Deploy Node.js backend services

### Development Tools
- **[Docker Documentation](https://docs.docker.com/)** - Containerization guide
- **[Next.js Documentation](https://nextjs.org/docs)** - React framework documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework

### API Testing
- **[Insomnia](https://insomnia.rest/)** - Powerful API testing and design tool
- **[Thunder Client](https://www.thunderclient.com/)** - VS Code API testing extension

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
