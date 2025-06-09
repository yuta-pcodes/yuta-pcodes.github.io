import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

// AIがここまでやってくれたのが面白いのでせっかくだから残しときます

interface LandingData {
  title: string;
  skills: string[];
  images: {
    reo: string;
    left: string;
  };
}
export const clientLoader = (_queryClient: QueryClient) => async () => {
  const data: LandingData = {
    title: "Yutaのプロフィール",
    skills: [
      "Java",
      "HTML / CSS", 
      "Javascript / Typescript",
      "Python3",
      "React",
      "Next.js",
      "GAS"
    ],
    images: {
      reo: "https://yuta.p-codes.dev/public_image/reo.jpg",
      left: "https://yuta.p-codes.dev/public_image/left.jpg"
    }
  };
  
  return data;
};

export const clientAction = (_queryClient: QueryClient) => async ({ request: _request }: { request: Request }) => {
  return null;
};

const LandingRoute = () => {
  const data = useLoaderData() as LandingData;

  return (
    <div id="outer" className='container'>
      <header>
        <h1>{data.title}</h1>
        <b>鋭意作成中</b>

      </header>
      <main>
        <h2>Yuta</h2>
        <p>開発者</p>
        <h3>skills</h3>
        <h4>言語・フレームワーク等</h4>
        <ul>
          {data.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </main>
      <aside>
        <div id="menu">
          <div id="left">
            <h3>cat</h3>
            <img src={data.images.reo} alt="reo" width="30%" height="30%" />
            <img src={data.images.left} alt="reo" width="30%" height="30%" />
          </div>
        </div>
      </aside>
      <footer>© 2025 Yuta's Profile</footer>
    </div>
  );
};

export default LandingRoute;
