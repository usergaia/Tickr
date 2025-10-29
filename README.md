# Tickr | Stock Tracker

A full-stack web application for tracking SWE stocks with end-of-day market data. Built with Next.js, Express.js, and Docker.


## Built with
- Node.js 20+
- Docker and Docker Compose
- MongoDB database
- Alpha Vantage API 
- Redis 

## Features

- **End-of-Day Stock Data** - Track software and technology stocks with daily market data
- **Top Gainers** - View latest stocks who had the highest gains
- **Highest OHLCV Prices** - Monitor highest performing stocks
- **Fast Performance/ Efficient API Handling** - Redis caching and client-side optimization
- **Docker Support** - Easy deployment and development
- **Auto-fetching** - Daily data updates with caching via GitHub actions

## Tech Stack

**Frontend:**
- Next.js 
- TypeScript
- Tailwind CSS
- Chart.js for data visualization

**Backend:**
- Express.js
- TypeScript
- MongoDB (Atlas)
- Redis (Upstash) for caching

**DevOps:**
- Docker & Docker Compose
- GitHub Actions CI/CD
- Vercel (client deployment)
- Render (server deployment)

## Resources Used

### API Documentation
- **[Alpha Vantage API Documentation](https://www.alphavantage.co/documentation/)** - Complete API reference and examples

### Database & Caching
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Free MongoDB hosting
- **[Upstash Redis](https://upstash.com/)** - Serverless Redis for caching

### Deployment Platforms
- **[Vercel](https://vercel.com/docs)** - Deploy Next.js applications
- **[Render](https://render.com/docs)** - Deploy Node.js backend services  (Might take a while to load due to Render free plan restriction)

### Development Tools
- **[Docker Documentation](https://docs.docker.com/)** - Containerization guide
- **[Next.js Documentation](https://nextjs.org/docs)** - React framework documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework

### API Testing
- **[Insomnia](https://insomnia.rest/)** - Powerful API testing and design tool
- **[Thunder Client](https://www.thunderclient.com/)** - VS Code API testing extension

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
