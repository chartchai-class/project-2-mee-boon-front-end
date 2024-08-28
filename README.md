[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/OhXb60Ty)

# Mee-Boon Olympic

## Group Name
Mee-Boon Olympic Team

## Members
| Name               | Student ID   | Contact Information      |
|--------------------|--------------|--------------------------|
| Chonthicha Maitham | 652115010    | chonthicha_mai@cmu.ac.th  |
| Wasan Renumat      | 652115044    | wasan_r@cmu.ac.th         |
| Woraphon Phankaew  | 652115046    | woraphon_ph@cmu.ac.th     |

## Deployed Website
You can access the deployed website here:
https://project-1-mee-boon.vercel.app/?fbclid=IwY2xjawE8H91leHRuA2FlbQIxMAABHS49-0QuD264E4X8Pjk1Pilk8r5NYBXLN8sBa09Avsz_kEPUfgpQwTwBtw_aem_Q36Y0GMTv_ohbZPPzNwl2g
## Project Description
Mee-Boon Olympic is a web application developed as part of the SE331 Component-Based Software Development course. The application provides a detailed Olympic report, showcasing the medal counts by country, detailed country information, and a list of sports in which each country has received medals.

### Features
- **Olympic Medal Table:** Displays the list of countries and their respective gold, silver, and bronze medal counts. The number of countries displayed per page can be set by the user.
- **Country Details:** Shows detailed information about each country when a country name is clicked, including a list of sports where the country has won medals.
- **Pagination:** Allows users to navigate through different pages of countries based on the number of countries they wish to view per page.
- **Cheer-Up Comments:** Users can leave comments to cheer up their favorite athletes. These comments are stored in Pinia and are shown on the relevant country pages.
- **Responsive Design:** The application is designed to be responsive, ensuring a seamless experience across devices.

## Mock Data
The application uses mock data provided through `db.json`, which includes enough data to test the pagination and other features of the application.

## Technology Stack
- **Frontend:** Vue.js, Tailwind CSS
- **State Management:** Pinia
- **Backend:** JSON Server (for mock data)
- **Deployment:** Vercel

## Getting Started
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/chartchai-class/project-1-mee-boon.git
   cd https://github.com/chartchai-class/project-1-mee-boon.git
   

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment
The application has been deployed on Vercel. You can access the live version using the URL provided above.


