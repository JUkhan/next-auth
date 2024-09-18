import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Image from 'next/image';
import { DialogTrigger } from '@/components/ui/plDialog';

const specialists = [
  { name: 'Artur Radwański', title: 'Prawnik, Radca prawny', location: 'Kraków', online: true },
  { name: 'Marta Sokołowska', title: 'Radca prawny', online: true },
  { name: 'Joanna Rasińska', title: 'Radca prawny', location: 'Kraków' },
];

const SpecialistBooking = () => {
  return (
    <div className="p-4 pt-8">
      <h1>Specialist Booking</h1>
      <DialogTrigger dialogId="prompt" close>
        <Button>Close</Button>
      </DialogTrigger>
    </div>
  );
};

export default SpecialistBooking;