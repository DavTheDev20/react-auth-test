import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Sorry, something went wrong. ☹️</h1>
      <h3>{error.statusText || error.statusMessage}</h3>
    </div>
  );
}
