'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { CarProps } from '@/types';
import { generateCarImageUrl } from '@/utils';

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" 
        onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
            
                <button
                  type="button"
                  className="absolute top-2 right-2 z-10 w-fit p-2 bg-blue-100 rounded-full hover:bg-blue-200"
                  onClick={closeModal}
                >
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>

           
                <div className="relative w-full h-64 bg-gray-100 rounded-lg">
                  <Image
                    src={generateCarImageUrl(car,'angle')} // Înlocuiește cu {car.image} dacă ai
                    alt={`${car.make} ${car.model}`}
                    fill
                    priority
                    className="object-contain p-4"
                  />
                </div>

              
                <div className="flex gap-3">
                  <div className="flex-1 relative w-full h-24 bg-blue-100 rounded-lg">
                    <Image src={generateCarImageUrl(car,'29')} alt="thumbnail 1" fill className="object-contain" />
                  </div>
                  <div className="flex-1 relative w-full h-24 bg-blue-100 rounded-lg">
                    <Image src={generateCarImageUrl(car,'33')} alt="thumbnail 2" fill className="object-contain" />
                  </div>
                  <div className="flex-1 relative w-full h-24 bg-blue-100 rounded-lg">
                    <Image src={generateCarImageUrl(car,'13')} alt="thumbnail 3" fill className="object-contain" />
                  </div>
                </div>

                
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-semibold text-xl capitalize">
                    {car.make} {car.model}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-4">
                    {Object.entries(car).map(([key, value]) => {
                      if (['make', 'model', 'image'].includes(key)) return null;

                      return (
                        <div className="flex justify-between gap-5 w-full" key={key}>
                          <h4 className="text-gray-500 capitalize">
                            {key.split('_').join(' ')}
                          </h4>
                          <p className="text-black font-semibold">{value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;