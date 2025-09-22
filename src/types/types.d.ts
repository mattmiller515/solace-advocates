declare type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

declare type GetAdvocatesResponse = {
  advocates: Advocate[];
  totalPages: number;
};
