import { useState } from "react";
// import './styles.css'

const a = {
     user:{
      id: 1,
      name: {
        firstName: "James",
        lastName: "Ibori"
      },
      location: {
        city: "Ikoyi",
        state: "Lagos",
        address: "One expensive house like that"
      }
    }
};

const style = {
    main: {
        height: "80vh",
      },
      searchWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
      }, 
      searchCard: {
        padding: '50px',
        color: '#fff',
        borderRadius: '20px',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
        background: 'linear-gradient(135deg, rgb(8, 114, 155) 20%, rgb(14, 65, 74) 100%)',
        cursor: 'pointer',
        transition:' all 300ms',
      },
      h1: {
        margin: '0',
        fontSize:' 3rem',
        fontWeight: 'lighter',
        textAlign: 'center',
      },
      input: {
        margin:' 30px auto 0',
        width: 'auto',
        height: '50px',
        borderRadius:'5px',
        border: 'none',
        lineHeight: '50px',
        padding: '0 20px',
        fontSize: '1.5rem',
        outline: 'none',
      },
    button: {
        display:' block',
        margin: '30px auto',
        width: '240px',
        height: '50px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 300ms',
      },
      resultWrapper: {
        padding: '10px 0',
        height: '40px',
        fontSize: '20px',
      }
      
}

function Search() {
  const [searchValue, setInput] = useState("");
  const [result, setResult] = useState("");
  const [objName] = useState('a')

  const findPath = (obj, query) => {

    for (const key in obj) {

      if (obj[key] && typeof obj[key] === "object") {
        let result = findPath(obj[key], query);

        if (result) {
          result.push(key);
          return result;
        }
      } else {
        if (
          typeof obj[key] === "string" &&
          obj[key].toLowerCase() === query.toLowerCase()
        ) {
          return [key];
        }
        if (typeof obj[key] === "number" && obj[key] === +query) {
          return [key];
        }
      }
    }
  };

  const getPath = (obj, item) => {

    function getActualPath (data) {
        const path = findPath(data, item);
        if (path == null) {
          return "";
        }
        return `${objName}.${path.reverse().join(".")}`;
      }

    if(Array.isArray(obj)){
        for(let i = 0; i < obj.length; i++){
            let result = getActualPath(obj[i]);
            if(result) {
               let [basePath, ...otherPaths] =  result.split('.')
                result = [`${basePath}[${i}]`, ...otherPaths].join('.')
                return result
            }
        }
        return;
    }

    return getActualPath(obj)
  };

  const getResult = (query) => {
    const result = getPath(a, query) || "Not Found";
    setResult(result);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue) {
      getResult(searchValue);
    } else {
      setResult("");
    }
  };

  return (
    <main style={style.main}>
      <div className="search-wrapper" style={style.searchWrapper}>
        <div className="result-wrapper" style={style.resultWrapper}>{result}</div>
        <div className = "search-card" style={style.searchCard}>
          <h1 style={style.h1}>Search Engine</h1>
          <input style={style.input} type="text" onChange={handleChange} />
          <button style={style.button} onClick={handleSearch}>Search</button>
        </div>
      </div>
    </main>
  );
}

export default Search;
