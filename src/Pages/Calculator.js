import React, { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLocation, useNavigate } from 'react-router-dom';

const locations = {
  Nigeria: {
    Lagos: ['Ikoyi', 'Victoria Island', 'Lekki', 'Ajah', 'Yaba', 'Ikeja', 'Surulere', 'Apapa', 'Oshodi', 'Festac'],
    Abuja: ['Maitama', 'Asokoro', 'Wuse', 'Garki', 'Gwarinpa', 'Jabi', 'Utako', 'Kubwa', 'Lugbe', 'Karu'],
    'Port Harcourt': ['Old GRA', 'New GRA', 'Trans Amadi', 'Rumuola', 'Elekahia', 'Diobu', 'Borokiri', 'Rumuokwurusi', 'Abuloma', 'Woji'],
    Kano: ['Nassarawa', 'Fagge', 'Dala', 'Gwale', 'Tarauni', 'Kumbotso', 'Ungogo', 'Kano Municipal', 'Dawakin Kudu', 'Garun Mallam'],
    Ibadan: ['Bodija', 'Iyaganku', 'Agodi', 'Oluyole', 'Akobo', 'Iwo Road', 'Challenge', 'Dugbe', 'Idi Ape', 'Jericho']
  },
  'United Kingdom': {
    London: ['Kensington', 'Chelsea', 'Westminster', 'Camden', 'Islington', 'Hackney', 'Tower Hamlets', 'Southwark', 'Lambeth', 'Wandsworth'],
    Manchester: ['City Centre', 'Didsbury', 'Chorlton', 'Salford', 'Rusholme', 'Fallowfield', 'Ancoats', 'Northern Quarter', 'Spinningfields', 'Castlefield'],
    Birmingham: ['City Centre', 'Edgbaston', 'Moseley', 'Harborne', 'Sutton Coldfield', 'Solihull', 'Digbeth', 'Jewellery Quarter', 'Kings Heath', 'Bournville'],
    Glasgow: ['City Centre', 'West End', 'Southside', 'East End', 'North Glasgow', 'Merchant City', 'Finnieston', 'Hillhead', 'Pollokshields', 'Shawlands'],
    Edinburgh: ['New Town', 'Old Town', 'Leith', 'Stockbridge', 'Morningside', 'Bruntsfield', 'Portobello', 'Newington', 'Corstorphine', 'Murrayfield']
  },
  'United States': {
    'New York': ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Harlem', 'SoHo', 'Upper East Side', 'Upper West Side', 'Greenwich Village'],
    'Los Angeles': ['Beverly Hills', 'Santa Monica', 'Hollywood', 'Venice', 'Pasadena', 'Downtown LA', 'Westwood', 'Brentwood', 'Silver Lake', 'Echo Park'],
    Chicago: ['Loop', 'Lincoln Park', 'Lakeview', 'Wicker Park', 'River North', 'Gold Coast', 'West Loop', 'Bucktown', 'Logan Square', 'Hyde Park'],
    Houston: ['Downtown', 'Midtown', 'Montrose', 'The Heights', 'River Oaks', 'West University', 'Memorial', 'Energy Corridor', 'Medical Center', 'Galleria'],
    Miami: ['South Beach', 'Downtown', 'Brickell', 'Coconut Grove', 'Coral Gables', 'Wynwood', 'Design District', 'Little Havana', 'Key Biscayne', 'Aventura']
  },
  'United Arab Emirates': {
    Dubai: ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Jumeirah Beach Residence', 'Emirates Hills', 'Arabian Ranches', 'The Springs', 'Jumeirah Lake Towers', 'Business Bay', 'Deira'],
    'Abu Dhabi': ['Al Reem Island', 'Saadiyat Island', 'Yas Island', 'Al Raha Beach', 'Khalifa City', 'Al Bateen', 'Corniche', 'Al Reef', 'Masdar City', 'Al Maryah Island'],
    Sharjah: ['Al Majaz', 'Al Khan', 'Al Nahda', 'Al Taawun', 'Al Qasimia', 'Al Mamzar', 'Al Gharb', 'Al Sharq', 'Al Yarmook', 'Al Falaj'],
    'Ras Al Khaimah': ['Al Hamra Village', 'Mina Al Arab', 'Al Marjan Island', 'Al Nakheel', 'Al Seer', 'Al Dhait', 'Al Rifaa', 'Al Mairid', 'Al Rams', 'Khuzam'],
    Ajman: ['Ajman Downtown', 'Al Rashidiya', 'Al Jurf', 'Al Zorah', 'Al Mowaihat', 'Al Hamidiya', 'Al Nuaimiya', 'Al Rawda', 'Al Sawan', 'Al Manama']
  },
  Canada: {
    Toronto: ['Downtown', 'Yorkville', 'The Annex', 'Leslieville', 'Rosedale', 'Liberty Village', 'Kensington Market', 'Distillery District', 'Bloor West Village', 'High Park'],
    Vancouver: ['Downtown', 'Kitsilano', 'Yaletown', 'Gastown', 'West End', 'Mount Pleasant', 'Fairview', 'Coal Harbour', 'Kerrisdale', 'Shaughnessy'],
    Montreal: ['Ville-Marie', 'Plateau-Mont-Royal', 'Westmount', 'Outremont', 'Mile End', 'Griffintown', 'Old Montreal', 'Little Italy', 'Rosemont', 'NDG'],
    Calgary: ['Downtown', 'Beltline', 'Kensington', 'Inglewood', 'Mission', 'Bridgeland', 'Eau Claire', 'Altadore', 'Hillhurst', 'Bowness'],
    Ottawa: ['ByWard Market', 'Centretown', 'Glebe', 'Westboro', 'Sandy Hill', 'New Edinburgh', 'Hintonburg', 'Rockcliffe Park', 'Alta Vista', 'Kanata']
  }
}

const currencySymbols = {
  Nigeria: '₦',
  'United Kingdom': '£',
  'United States': '$',
  'United Arab Emirates': 'AED',
  Canada: 'C$'
}

const currencyFormatter = (value, country) => {
  const symbol = currencySymbols[country]
  const formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 0 })
  return `${symbol}${formattedValue}`
}

function Calculator() {
  const [country, setCountry] = useState('Nigeria')
  const [city, setCity] = useState('Lagos')
  const [area, setArea] = useState('Ikoyi')
  const [squareFootage, setSquareFootage] = useState(1000)
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [condition, setCondition] = useState(5)
  const [amenityProximity, setAmenityProximity] = useState(5)
  const [landValue, setLandValue] = useState(100000)
  const [comps, setComps] = useState(500000)
  const [constructionCost, setConstructionCost] = useState(0)
  const [activeTab, setActiveTab] = useState("input")
  const tabsRef = useRef(null)

  const calculatePropertyValue = () => {
    const baseValue = squareFootage * 200
    const locationMultiplier = 1 + (amenityProximity / 10)
    const conditionMultiplier = 0.5 + (condition / 10)
    const roomsValue = (bedrooms * 10000) + (bathrooms * 5000)
    const calculatedValue = (baseValue + landValue + roomsValue + constructionCost) * locationMultiplier * conditionMultiplier
    return Math.round(calculatedValue)
  }

  const propertyValue = calculatePropertyValue()
  const pricePerSquareFoot = Math.round(propertyValue / squareFootage)
  const yearOverYearAppreciation = Math.round(propertyValue * 0.03)
  const rentalIncomePotential = Math.round(propertyValue * 0.005)
  const propertyTaxEstimate = Math.round(propertyValue * 0.01)
  const maintenanceCostProjection = Math.round(propertyValue * 0.01)

  const handleSeeResults = () => {
    setActiveTab("results")
    if (tabsRef.current) {
      tabsRef.current.value = "results"
    }
  }

  const handleDownloadResults = () => {
    const results = {
      propertyValue,
      pricePerSquareFoot,
      yearOverYearAppreciation,
      rentalIncomePotential,
      propertyTaxEstimate,
      maintenanceCostProjection,
      timestamp: new Date().toISOString()
    }

    const resultsString = JSON.stringify(results, null, 2)
    const blob = new Blob([resultsString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'property_valuation_results.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const navigate = useNavigate();

  return (
    <>
      <Nav/>
      <Card className="w-full p-4 mx-auto">
        <button onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 ml-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</button>


        <CardHeader>
          <CardTitle className="text-5xl font-hel tracking-tighter ">Property Value Calculator</CardTitle>
          <CardDescription>Calculate the estimated value of a property based on various factors</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="w-full" value={activeTab} onValueChange={setActiveTab} ref={tabsRef}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={(value) => { setCountry(value); setCity(Object.keys(locations[value])[0]); setArea(locations[value][Object.keys(locations[value])[0]][0]); }} defaultValue={country}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(locations).map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="font-hel text-sm text-gray-500">The country where the property is located.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select onValueChange={(value) => { setCity(value); setArea(locations[country][value][0]); }} defaultValue={city}>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(locations[country]).map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="font-hel text-sm text-gray-500">The city where the property is situated.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <Select onValueChange={setArea} defaultValue={area}>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations[country][city].map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="font-hel text-sm text-gray-500">The specific area or neighborhood within the city.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="squareFootage">Square Footage</Label>
                  <Input
                    id="squareFootage"
                    type="number"
                    value={squareFootage}
                    onChange={(e) => setSquareFootage(Number(e.target.value))}
                  />
                  <p className="font-hel text-sm text-gray-500">The total living area of the property in square feet.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                  />
                  <p className="font-hel text-sm text-gray-500">The number of bedrooms in the property.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                  />
                  <p className="font-hel text-sm text-gray-500">The number of bathrooms in the property.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Property Condition (1-10)</Label>
                  <Slider
                    id="condition"
                    min={1}
                    max={10}
                    step={1}
                    value={[condition]}
                    onValueChange={(value) => setCondition(value[0])}
                    className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-black [&_[role=slider]]:border bg-black"
                  />
                  <p className="font-hel text-sm text-gray-500">The overall condition of the property, with 1 being poor and 10 being excellent.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amenityProximity">Proximity to Amenities (1-10)</Label>
                  <Slider
                    id="amenityProximity"
                    min={1}
                    max={10}
                    step={1}
                    value={[amenityProximity]}
                    onValueChange={(value) => setAmenityProximity(value[0])}
                    className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-black [&_[role=slider]]:border bg-black"
                  />
                  <p className="font-hel text-sm text-gray-500">How close the property is to desirable amenities, with 1 being far and 10 being very close.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landValue">Land Value</Label>
                  <Input
                    id="landValue"
                    type="number"
                    value={landValue}
                    onChange={(e) => setLandValue(Number(e.target.value))}
                  />
                  <p className="font-hel text-sm text-gray-500">The estimated value of the land without any structures.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="constructionCost">Total Cost of Construction</Label>
                  <Input
                    id="constructionCost"
                    type="number"
                    value={constructionCost}
                    onChange={(e) => setConstructionCost(Number(e.target.value))}
                  />
                  <p className="font-hel text-sm text-gray-500">The total cost to construct the property, including materials and labor.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comps">Comparable Sales Average</Label>
                  <Input
                    id="comps"
                    type="number"
                    value={comps}
                    onChange={(e) => setComps(Number(e.target.value))}
                  />
                  <p className="font-hel text-sm text-gray-500">The average sale price of similar properties in the area.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="results">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Estimated Property Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currencyFormatter(propertyValue, country)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Price per Square Foot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currencyFormatter(pricePerSquareFoot, country)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Year-over-Year Appreciation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currencyFormatter(yearOverYearAppreciation, country)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Rental Income Potential</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currencyFormatter(rentalIncomePotential, country)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Property Tax Estimate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currencyFormatter(propertyTaxEstimate, country)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Maintenance Cost Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currencyFormatter(maintenanceCostProjection, country)}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4">
                <Button className=" w-full bg-black text-white font-hel tracking-tight" onClick={handleDownloadResults}>
                  Download Results
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          {activeTab === "input" ? (
            <Button className="w-full bg-black text-white font-hel tracking-tight" onClick={handleSeeResults}>
              See Results
            </Button>
          ) : (
            <Button className="w-full font-hel tracking-tight" onClick={() => setActiveTab("input")}>
              Back to Input
            </Button>
          )}
        </CardFooter>
      </Card>
      <Footer/>
    </>
  )
}

export default Calculator
