
import './App.css';

function App() {
  
  const [inputUrls, setInputUrls] = useState('');
  const [result, setResult] = useState(null);

  const handleFetchNumbers = async () => {
    try {
      const urlsArray = inputUrls.split(',').map(url => url.trim());
      const response = await axios.get(`http://localhost:8008/numbers?url=${urlsArray.join('&url=')}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div class="container">
      <h1 class="h1">Number Management Service</h1> <br />
      <p class="h5">Enter urls:</p> <br />
      <input type="text" value={inputUrls} class="form-control" onChange={(e) => setInputUrls(e.target.value)} /> <br />
      <button class="btn btn-primary" onClick={handleFetchNumbers}>Fetch</button> <br /><br />
      {result && (
        <div>
          <h2 class="h2">Answer</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
