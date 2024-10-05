import React, { useState, useEffect } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Calendar } from "../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Loader2 } from "lucide-react";

const CAL_API_KEY = 'cal_live_af9ebb540be1a5b0b05c49a7da90b5fb'; // Replace with your actual Cal.com API key
const CAL_USERNAME = 'wokeupbored';
const EVENT_TYPE = 'schedule-inspection';

const fetchCalEvents = async (start, end) => {
    const startDate = format(start, 'yyyy-MM-dd');
    const endDate = format(end, 'yyyy-MM-dd');
    
    const apiUrl = `https://api.cal.com/v1/schedules/${CAL_USERNAME}/${EVENT_TYPE}/availability`;
    const params = new URLSearchParams({
      apiKey: CAL_API_KEY,
      dateFrom: startDate,
      dateTo: endDate
    });
  
    try {
      const response = await fetch(`${apiUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Transform the data to match our expected format
      return data.busy.map((event, index) => ({
        id: index,
        title: 'Scheduled Inspection',
        date: event.start,
      }));
    } catch (error) {
      console.error('Error fetching Cal.com events:', error);
      throw error;
    }
  };

export default function ScheduledInspection() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        const fetchedEvents = await fetchCalEvents(start, end);
        setEvents(fetchedEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [date]);

  const daysWithEvents = events.map(event => format(parseISO(event.date), 'yyyy-MM-dd'));

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Scheduled Inspections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Inspection Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              components={{
                day: ({ date, ...props }) => {
                  const dateString = format(date, 'yyyy-MM-dd');
                  const hasEvent = daysWithEvents.includes(dateString);
                  return (
                    <div {...props}>
                      {props.children}
                      {hasEvent && <Badge className="absolute bottom-0 right-0" variant="secondary" />}
                    </div>
                  );
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Inspections</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <Table>
                <TableCaption>A list of upcoming property inspections</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{format(parseISO(event.date), 'MMMM d, yyyy')}</TableCell>
                      <TableCell>{format(parseISO(event.date), 'h:mm a')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}