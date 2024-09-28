import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subMonths } from 'date-fns';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/20/solid';

const API_KEY = 'YOUR_RAPIDAPI_KEY';
const API_HOST = 'realty-mole-property-api.p.rapidapi.com';

const countries = [
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function RealEstateInsights() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState(6);
  const [propertyData, setPropertyData] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cachedData = useMemo(() => ({}), []);

  useEffect(() => {
    fetchData();
  }, [selectedCountry, dateRange]);

  const fetchData = async () => {
    if (cachedData[selectedCountry.code] && cachedData[selectedCountry.code][dateRange]) {
      setPropertyData(cachedData[selectedCountry.code][dateRange].propertyData);
      setPropertyTypes(cachedData[selectedCountry.code][dateRange].propertyTypes);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://realty-mole-property-api.p.rapidapi.com/saleListings', {
        params: { state: selectedCountry.code },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      });

      const { processedData, types } = processApiResponse(response.data);
      setPropertyData(processedData);
      setPropertyTypes(types);

      // Cache the data
      cachedData[selectedCountry.code] = {
        ...cachedData[selectedCountry.code],
        [dateRange]: { propertyData: processedData, propertyTypes: types },
      };
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const processApiResponse = (data) => {
    // Process and format the API response data
    // This is a placeholder implementation. You'll need to adjust this based on the actual API response structure.
    const processedData = data.map((item) => ({
      date: format(new Date(item.listedDate), 'MMM yyyy'),
      price: item.price,
      type: item.propertyType,
    })).slice(0, dateRange);

    const types = processedData.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    return { processedData, types: Object.entries(types).map(([name, value]) => ({ name, value })) };
  };

  const filteredData = propertyData.filter((item) =>
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averagePriceByType = useMemo(() => {
    const priceSum = {};
    const priceCount = {};
    filteredData.forEach((item) => {
      if (!priceSum[item.type]) {
        priceSum[item.type] = 0;
        priceCount[item.type] = 0;
      }
      priceSum[item.type] += item.price;
      priceCount[item.type]++;
    });
    return Object.keys(priceSum).map((type) => ({
      type,
      averagePrice: priceSum[type] / priceCount[type],
    }));
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Real Estate Market Insights</h1>
          
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Select Country
              </label>
              <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                  <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {selectedCountry.flag} {selectedCountry.name}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {countries.map((country) => (
                      <Menu.Item key={country.code}>
                        {({ active }) => (
                          <button
                            onClick={() => setSelectedCountry(country)}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block px-4 py-2 text-sm w-full text-left`}
                          >
                            {country.flag} {country.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
            </div>
            
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by date..."
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(Number(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value={3}>Last 3 months</option>
                <option value={6}>Last 6 months</option>
                <option value={12}>Last 12 months</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Average Property Prices in {selectedCountry.name}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Property Types Distribution</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={propertyTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Average Price by Property Type</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={averagePriceByType}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averagePrice" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={fetchData}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Refresh Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
