import { logoAtt, logoIntel, logoMicrosoft, logoOkta } from '@/images/logos';
import { StaticImageData } from 'next/image';

type Role = {
  company: string;
  title: string;
  url: string;
  logo: StaticImageData;
  start: string;
  end: string;
};

// TODO: fetch this from Sanity at some point
export const resumeRoles: Role[] = [
    {
    company: 'Okta',
      url: 'https://www.okta.com/',
      title: 'Software Engineer',
      logo: logoOkta,
      start: 'Dec 2019',
      end: 'Present',

    },
    {
      company: 'Microsoft',
      url: 'https://microsoft.com',
      title: 'Software Engineer',
      logo: logoMicrosoft,
      start: 'May 2019',
      end: 'Oct 2019',
    },
    {
      company: 'AT&T',
      url: 'https://www.att.com/',
      title: 'Web Developer',
      logo: logoAtt,
      start: 'Apr 2017',
      end: 'Oct 2018',
    },
    {
      company: 'Intel',
      url: 'https://www.intel.com/',
      title: 'Web Producer',
      logo: logoIntel,
      start: 'Dec 2016',
      end: 'Apr 2017',
    },
  ];
