# CV Analyzer

CV Analyzer is a web application that allows users to upload their CVs in image or PDF format. The application uses OpenAI's API to analyze the CV and provide a detailed analysis of its contents.

## Principal technologies and tools used

### Frontend

- **React**
- **React Router**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **NextUI**

### Backend

- **NestJS**
- **TypeScript**
- **LangChain**

## Prerequisites (linux)

### For Backend

- **GraphicsMagick**: A software suite to create, edit, and compose bitmap images.
  ```sh
  sudo apt-get install graphicsmagick
  ```
- **Ghostscript**: An interpreter for PostScript and PDF.
  ```sh
  sudo apt-get install ghostscript
  ```

## Installation and Setup

### Clone the Repository

```sh
git clone https://github.com/your-repo/cv-analyzer.git
cd cv-analyzer
```

### Setup Frontend

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install the dependencies:

   ```sh
   yarn install
   ```

3. Run the development server:

   ```sh
   yarn dev
   ```

4. Build the project for production:

   ```sh
   yarn build
   ```

### Setup Backend

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install the dependencies:

   ```sh
   yarn install
   ```

3. Run the development server:

   ```sh
   yarn dev
   ```

4. Build the project for production:

   ```sh
   yarn build
   ```

## License

This project is licensed under the MIT License.
