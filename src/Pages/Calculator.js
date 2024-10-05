import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"





const countries = [
    { name: 'Nigeria', currency: 'NGN', symbol: '₦' },
    { name: 'United Kingdom', currency: 'GBP', symbol: '£' }
  ]

const states = {
    Nigeria: ['Lagos', 'Imo'],
    'United Kingdom': ['England', 'Scotland']
  }
  
  const areas = {
    Lagos: ['Banana Island', 'Lekki'],
    Imo: ['Owerri', 'Orlu'],
    England: ['London', 'Manchester'],
    Scotland: ['Edinburgh', 'Glasgow']
  }





export default function PropertyValuationCalculator() {
    const [propertyDetails, setPropertyDetails] = useState({
        country: '',
        state: '',
        area: '',
        squareFootage: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: '',
      })
      const [valuation, setValuation] = useState(null)
      const [currency, setCurrency] = useState({ name: 'NGN', symbol: '₦' })
    
      useEffect(() => {
        if (propertyDetails.country) {
          const selectedCountry = countries.find(c => c.name === propertyDetails.country)
          setCurrency({ name: selectedCountry.currency, symbol: selectedCountry.symbol })
        }
      }, [propertyDetails.country])
    
      const handleInputChange = (e) => {
        const { name, value } = e.target
        setPropertyDetails(prev => ({ ...prev, [name]: value }))
      }
    
      const handleSelectChange = (name, value) => {
        setPropertyDetails(prev => {
          const newDetails = { ...prev, [name]: value }
          if (name === 'country') {
            newDetails.state = ''
            newDetails.area = ''
          } else if (name === 'state') {
            newDetails.area = ''
          }
          return newDetails
        })
      }
    
      const calculateValuation = () => {
        // This is a simplified valuation calculation
        const baseValue = propertyDetails.country === 'Nigeria' ? 50000000 : 200000 // 50M Naira or 200K GBP
        const sqftValue = parseInt(propertyDetails.squareFootage) * (propertyDetails.country === 'Nigeria' ? 10000 : 100)
        const bedroomValue = parseInt(propertyDetails.bedrooms) * (propertyDetails.country === 'Nigeria' ? 5000000 : 10000)
        const bathroomValue = parseInt(propertyDetails.bathrooms) * (propertyDetails.country === 'Nigeria' ? 3000000 : 5000)
        
        let locationMultiplier = 1
        if (propertyDetails.area === 'Banana Island' || propertyDetails.area === 'London') locationMultiplier = 2
        else if (propertyDetails.area === 'Lekki' || propertyDetails.area === 'Edinburgh') locationMultiplier = 1.5
    
        const propertyTypeMultiplier = propertyDetails.propertyType === 'House' ? 1.1 : 1
    
        const estimatedValue = (baseValue + sqftValue + bedroomValue + bathroomValue) * locationMultiplier * propertyTypeMultiplier
    
        setValuation(Math.round(estimatedValue))
      }
    
      return (
        <div className="container mx-auto p-4">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Property Valuation Calculator</CardTitle>
              <CardDescription>Enter your property details to get an estimated valuation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); calculateValuation(); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select onValueChange={(value) => handleSelectChange('country', value)}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select onValueChange={(value) => handleSelectChange('state', value)} disabled={!propertyDetails.country}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyDetails.country && states[propertyDetails.country].map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <Select onValueChange={(value) => handleSelectChange('area', value)} disabled={!propertyDetails.state}>
                      <SelectTrigger id="area">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyDetails.state && areas[propertyDetails.state].map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="squareFootage">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      name="squareFootage"
                      type="number"
                      placeholder="Enter square footage"
                      value={propertyDetails.squareFootage}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      placeholder="Number of bedrooms"
                      value={propertyDetails.bedrooms}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      placeholder="Number of bathrooms"
                      value={propertyDetails.bathrooms}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select onValueChange={(value) => handleSelectChange('propertyType', value)}>
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">Calculate Valuation</Button>
              </form>
    
              {valuation && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Valuation Results</h3>
                  <p className="text-2xl font-bold mb-4">
                    Estimated Value: {currency.symbol}{valuation.toLocaleString()} {currency.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }