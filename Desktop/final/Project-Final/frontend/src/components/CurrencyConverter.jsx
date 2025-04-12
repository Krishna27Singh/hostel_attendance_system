import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [toCurrency, setToCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [prevRate, setPrevRate] = useState(null); // New: track previous rate

  // Fetch available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = 
        await axios.get(`${BACKEND_URL}/api/currency/all`);

        const codes = Object.keys(response.data.rates);

        const options = codes.map((code) => ({
          value: code,
          label: code,
        }));
        setCurrencyOptions(options);
      } catch (error) {
        console.error("Failed to load currencies:", error.message);
      }
    };

    fetchCurrencies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toCurrency) return;

    try {
      // const response = await axios.get(
      //   `http://localhost:5000/api/currency/convert?amount=${amount}&to=${toCurrency.value}`
      // );
      const response = await axios.get(`${BACKEND_URL}/api/currency/convert?amount=${amount}&to=${toCurrency.value}`);

      // Store current rate as previous before updating result
      if (result?.rate) {
        setPrevRate(result.rate);
      }

      setResult(response.data);
    } catch (error) {
      console.error("Conversion Error", error);
    }
  };

  // Helper to render arrow based on rate comparison
  const renderRateArrow = () => {
    if (prevRate == null || result == null) return null;

    if (result.rate > prevRate) {
      return <span className="text-green-600 ml-2">🔼</span>;
    } else if (result.rate < prevRate) {
      return <span className="text-red-600 ml-2">🔽</span>;
    } else {
      return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Currency Converter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <Select
          options={currencyOptions}
          value={toCurrency}
          onChange={setToCurrency}
          placeholder="Select currency..."
          isSearchable
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
        >
          Convert
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p>
            <strong>{result.amount} {result.base}</strong> ={" "}
            <strong>{result.result} {result.target}</strong>
          </p>
          <p>
            Rate: {result.rate}
            {renderRateArrow()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
