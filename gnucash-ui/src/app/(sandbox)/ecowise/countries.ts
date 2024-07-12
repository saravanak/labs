import { head, zip } from 'lodash';

const countries = [
  'Switzerland',
  'Norway',
  'Iceland',
  'Hong Kong',
  'Denmark',
  'Sweden',
  'Ireland',
  'Germany',
  'Singapore',
  'Netherlands',
  'Australia',
  'Liechtenstein',
  'Belgium',
  'Finland',
  'United Kingdom',
  'New Zealand',
  'United Arab Emirates',
  'Canada',
  'South Korea',
  'Luxembourg',
  'United States',
  'Slovenia',
  'Austria',
  'Japan',
  'Israel',
  'Malta',
  'Spain',
  'France',
  'Cyprus',
  'Italy',
  'Estonia',
  'Czech Republic',
  'Greece',
  'Bahrain',
  'Andorra',
  'Poland',
  'Latvia',
  'Lithuania',
  'Croatia',
  'Qatar',
  'Saudi Arabia',
  'Portugal',
  'San Marino',
  'Chile',
  'Turkey',
  'Slovakia',
  'Hungary',
  'Argentina',
  'Kuwait',
  'Montenegro',
  'Saint Kitts and Nevis',
  'Uruguay',
  'Romania',
  'Antigua and Barbuda',
  'Brunei',
  'Russia',
  'Bahamas',
  'Panama',
  'Oman',
  'Trinidad and Tobago',
  'Georgia',
  'Barbados',
  'Malaysia',
  'Costa Rica',
  'Serbia',
  'Thailand',
  'Seychelles',
  'Kazakhstan',
  'Belarus',
  'Bulgaria',
  'Palau',
  'Mauritius',
  'Grenada',
  'Albania',
  'China',
  'Armenia',
  'Mexico',
  'Iran',
  'Sri Lanka',
  'Bosnia and Herzegovina',
  'Saint Vincent and the Grenadines',
  'Dominican Republic',
  'Ecuador',
  'North Macedonia',
  'Cuba',
  'Moldova',
  'Maldives',
  'Peru',
  'Azerbaijan',
  'Brazil',
  'Colombia',
  'Libya',
  'Algeria',
  'Turkmenistan',
  'Guyana',
  'Mongolia',
  'Dominica',
  'Tonga',
  'Jordan',
  'Ukraine',
  'Tunisia',
  'Marshall Islands',
  'Paraguay',
  'Fiji',
  'Egypt',
  'Uzbekistan',
  'Vietnam',
  'Saint Lucia',
  'Lebanon',
  'South Africa',
  'Palestine',
  'Indonesia',
  'Philippines',
  'Botswana',
  'Jamaica',
  'Samoa',
  'Kyrgyzstan',
  'Belize',
  'Venezuela',
  'Morocco',
  'Bolivia',
  'Nauru',
  'Gabon',
  'Suriname',
  'Bhutan',
  'Tajikistan',
  'El Salvador',
  'Iraq',
  'Bangladesh',
  'Nicaragua',
  'Cape Verde',
  'Tuvalu',
  'Equatorial Guinea',
  'India',
  'Micronesia',
  'Guatemala',
  'Kiribati',
  'Honduras',
  'Laos',
  'Vanuatu',
  'São Tomé and Príncipe',
  'Eswatini',
  'Namibia',
  'Myanmar',
  'Ghana',
  'Nepal',
  'Kenya',
  'Cambodia',
  'Congo',
  'Angola',
  'Cameroon',
  'Comoros',
  'Zambia',
  'Papua New Guinea',
  'Timor-Leste',
  'Solomon Islands',
  'Syria',
  'Haiti',
  'Uganda',
  'Zimbabwe',
  'Rwanda',
  'Nigeria',
  'Togo',
  'Pakistan',
  'Mauritania',
  'Ivory Coast',
  'Tanzania',
  'Lesotho',
  'Senegal',
  'Sudan',
  'Djibouti',
  'Malawi',
  'Benin',
  'Gambia',
  'Eritrea',
  'Ethiopia',
  'Liberia',
  'Madagascar',
  'Guinea-Bissau',
  'DR Congo',
  'Guinea',
  'Afghanistan',
  'Mozambique',
  'Sierra Leone',
  'Burkina Faso',
  'Yemen',
  'Burundi',
  'Mali',
  'Niger',
  'Chad',
  'Central African Republic',
  'South Sudan',
  'Somalia',
];

const hdis = [
  {
    value: 0.967,
    rowSpan: 1,
  },
  {
    value: 0.966,
    rowSpan: 1,
  },
  {
    value: 0.959,
    rowSpan: 1,
  },
  {
    value: 0.956,
    rowSpan: 1,
  },
  {
    value: 0.952,
    rowSpan: 2,
  },
  {
    value: 0.95,
    rowSpan: 2,
  },
  {
    value: 0.949,
    rowSpan: 1,
  },
  {
    value: 0.946,
    rowSpan: 2,
  },
  {
    value: 0.942,
    rowSpan: 3,
  },
  {
    value: 0.94,
    rowSpan: 1,
  },
  {
    value: 0.939,
    rowSpan: 1,
  },
  {
    value: 0.937,
    rowSpan: 1,
  },
  {
    value: 0.935,
    rowSpan: 1,
  },
  {
    value: 0.929,
    rowSpan: 1,
  },
  {
    value: 0.927,
    rowSpan: 2,
  },
  {
    value: 0.926,
    rowSpan: 2,
  },
  {
    value: 0.92,
    rowSpan: 1,
  },
  {
    value: 0.915,
    rowSpan: 2,
  },
  {
    value: 0.911,
    rowSpan: 1,
  },
  {
    value: 0.91,
    rowSpan: 1,
  },
  {
    value: 0.907,
    rowSpan: 1,
  },
  {
    value: 0.906,
    rowSpan: 1,
  },
  {
    value: 0.899,
    rowSpan: 1,
  },
  {
    value: 0.895,
    rowSpan: 1,
  },
  {
    value: 0.893,
    rowSpan: 1,
  },
  {
    value: 0.888,
    rowSpan: 1,
  },
  {
    value: 0.884,
    rowSpan: 1,
  },
  {
    value: 0.881,
    rowSpan: 1,
  },
  {
    value: 0.879,
    rowSpan: 2,
  },
  {
    value: 0.878,
    rowSpan: 1,
  },
  {
    value: 0.875,
    rowSpan: 2,
  },
  {
    value: 0.874,
    rowSpan: 1,
  },
  {
    value: 0.867,
    rowSpan: 1,
  },
  {
    value: 0.86,
    rowSpan: 1,
  },
  {
    value: 0.855,
    rowSpan: 2,
  },
  {
    value: 0.851,
    rowSpan: 1,
  },
  {
    value: 0.849,
    rowSpan: 1,
  },
  {
    value: 0.847,
    rowSpan: 1,
  },
  {
    value: 0.844,
    rowSpan: 1,
  },
  {
    value: 0.838,
    rowSpan: 1,
  },
  {
    value: 0.83,
    rowSpan: 1,
  },
  {
    value: 0.827,
    rowSpan: 1,
  },
  {
    value: 0.826,
    rowSpan: 1,
  },
  {
    value: 0.823,
    rowSpan: 1,
  },
  {
    value: 0.821,
    rowSpan: 1,
  },
  {
    value: 0.82,
    rowSpan: 2,
  },
  {
    value: 0.819,
    rowSpan: 1,
  },
  {
    value: 0.814,
    rowSpan: 2,
  },
  {
    value: 0.809,
    rowSpan: 1,
  },
  {
    value: 0.807,
    rowSpan: 1,
  },
  {
    value: 0.806,
    rowSpan: 1,
  },
  {
    value: 0.805,
    rowSpan: 1,
  },
  {
    value: 0.803,
    rowSpan: 1,
  },
  {
    value: 0.802,
    rowSpan: 2,
  },
  {
    value: 0.801,
    rowSpan: 1,
  },
  {
    value: 0.799,
    rowSpan: 1,
  },
  {
    value: 0.797,
    rowSpan: 1,
  },
  {
    value: 0.796,
    rowSpan: 1,
  },
  {
    value: 0.793,
    rowSpan: 1,
  },
  {
    value: 0.789,
    rowSpan: 1,
  },
  {
    value: 0.788,
    rowSpan: 1,
  },
  {
    value: 0.786,
    rowSpan: 1,
  },
  {
    value: 0.781,
    rowSpan: 1,
  },
  {
    value: 0.78,
    rowSpan: 2,
  },
  {
    value: 0.779,
    rowSpan: 1,
  },
  {
    value: 0.772,
    rowSpan: 1,
  },
  {
    value: 0.766,
    rowSpan: 1,
  },
  {
    value: 0.765,
    rowSpan: 2,
  },
  {
    value: 0.764,
    rowSpan: 1,
  },
  {
    value: 0.763,
    rowSpan: 1,
  },
  {
    value: 0.762,
    rowSpan: 2,
  },
  {
    value: 0.76,
    rowSpan: 2,
  },
  {
    value: 0.758,
    rowSpan: 1,
  },
  {
    value: 0.746,
    rowSpan: 1,
  },
  {
    value: 0.745,
    rowSpan: 1,
  },
  {
    value: 0.744,
    rowSpan: 1,
  },
  {
    value: 0.742,
    rowSpan: 1,
  },
  {
    value: 0.741,
    rowSpan: 1,
  },
  {
    value: 0.74,
    rowSpan: 1,
  },
  {
    value: 0.739,
    rowSpan: 1,
  },
  {
    value: 0.736,
    rowSpan: 1,
  },
  {
    value: 0.734,
    rowSpan: 1,
  },
  {
    value: 0.732,
    rowSpan: 1,
  },
  {
    value: 0.731,
    rowSpan: 2,
  },
  {
    value: 0.729,
    rowSpan: 1,
  },
  {
    value: 0.728,
    rowSpan: 1,
  },
  {
    value: 0.727,
    rowSpan: 1,
  },
  {
    value: 0.726,
    rowSpan: 1,
  },
  {
    value: 0.725,
    rowSpan: 1,
  },
  {
    value: 0.723,
    rowSpan: 1,
  },
  {
    value: 0.717,
    rowSpan: 1,
  },
  {
    value: 0.716,
    rowSpan: 1,
  },
  {
    value: 0.713,
    rowSpan: 1,
  },
  {
    value: 0.71,
    rowSpan: 1,
  },
  {
    value: 0.708,
    rowSpan: 1,
  },
  {
    value: 0.706,
    rowSpan: 1,
  },
  {
    value: 0.702,
    rowSpan: 1,
  },
  {
    value: 0.701,
    rowSpan: 1,
  },
  {
    value: 0.7,
    rowSpan: 1,
  },
  {
    value: 0.699,
    rowSpan: 1,
  },
  {
    value: 0.698,
    rowSpan: 2,
  },
  {
    value: 0.696,
    rowSpan: 1,
  },
  {
    value: 0.693,
    rowSpan: 1,
  },
  {
    value: 0.69,
    rowSpan: 1,
  },
  {
    value: 0.681,
    rowSpan: 1,
  },
  {
    value: 0.679,
    rowSpan: 1,
  },
  {
    value: 0.674,
    rowSpan: 1,
  },
  {
    value: 0.673,
    rowSpan: 1,
  },
  {
    value: 0.67,
    rowSpan: 1,
  },
  {
    value: 0.669,
    rowSpan: 1,
  },
  {
    value: 0.661,
    rowSpan: 1,
  },
  {
    value: 0.653,
    rowSpan: 1,
  },
  {
    value: 0.65,
    rowSpan: 1,
  },
  {
    value: 0.644,
    rowSpan: 1,
  },
  {
    value: 0.634,
    rowSpan: 1,
  },
  {
    value: 0.629,
    rowSpan: 1,
  },
  {
    value: 0.628,
    rowSpan: 1,
  },
  {
    value: 0.624,
    rowSpan: 1,
  },
  {
    value: 0.62,
    rowSpan: 1,
  },
  {
    value: 0.614,
    rowSpan: 1,
  },
  {
    value: 0.613,
    rowSpan: 1,
  },
  {
    value: 0.61,
    rowSpan: 2,
  },
  {
    value: 0.608,
    rowSpan: 1,
  },
  {
    value: 0.602,
    rowSpan: 1,
  },
  {
    value: 0.601,
    rowSpan: 2,
  },
  {
    value: 0.6,
    rowSpan: 1,
  },
  {
    value: 0.593,
    rowSpan: 1,
  },
  {
    value: 0.591,
    rowSpan: 1,
  },
  {
    value: 0.587,
    rowSpan: 1,
  },
  {
    value: 0.586,
    rowSpan: 1,
  },
  {
    value: 0.569,
    rowSpan: 1,
  },
  {
    value: 0.568,
    rowSpan: 1,
  },
  {
    value: 0.566,
    rowSpan: 1,
  },
  {
    value: 0.562,
    rowSpan: 1,
  },
  {
    value: 0.557,
    rowSpan: 1,
  },
  {
    value: 0.552,
    rowSpan: 1,
  },
  {
    value: 0.55,
    rowSpan: 2,
  },
  {
    value: 0.548,
    rowSpan: 2,
  },
  {
    value: 0.547,
    rowSpan: 1,
  },
  {
    value: 0.54,
    rowSpan: 2,
  },
  {
    value: 0.534,
    rowSpan: 1,
  },
  {
    value: 0.532,
    rowSpan: 1,
  },
  {
    value: 0.521,
    rowSpan: 1,
  },
  {
    value: 0.517,
    rowSpan: 1,
  },
  {
    value: 0.516,
    rowSpan: 1,
  },
  {
    value: 0.515,
    rowSpan: 1,
  },
  {
    value: 0.508,
    rowSpan: 1,
  },
  {
    value: 0.504,
    rowSpan: 1,
  },
  {
    value: 0.495,
    rowSpan: 1,
  },
  {
    value: 0.493,
    rowSpan: 1,
  },
  {
    value: 0.492,
    rowSpan: 1,
  },
  {
    value: 0.487,
    rowSpan: 2,
  },
  {
    value: 0.483,
    rowSpan: 1,
  },
  {
    value: 0.481,
    rowSpan: 1,
  },
  {
    value: 0.471,
    rowSpan: 1,
  },
  {
    value: 0.462,
    rowSpan: 1,
  },
  {
    value: 0.461,
    rowSpan: 1,
  },
  {
    value: 0.458,
    rowSpan: 1,
  },
  {
    value: 0.438,
    rowSpan: 1,
  },
  {
    value: 0.424,
    rowSpan: 1,
  },
  {
    value: 0.42,
    rowSpan: 1,
  },
  {
    value: 0.41,
    rowSpan: 1,
  },
  {
    value: 0.394,
    rowSpan: 2,
  },
  {
    value: 0.387,
    rowSpan: 1,
  },
  {
    value: 0.381,
    rowSpan: 1,
  },
  {
    value: 0.38,
    rowSpan: 1,
  },
];

const expandedHdis = hdis.reduce((a, v): any => {
  if (v.rowSpan == 2) {
    return [...a, v.value, v.value];
  } else if (v.rowSpan == 1) {
    return [...a, v.value];
  }
  if (v.rowSpan == 3) {
    return [...a, v.value, v.value, v.value];
  } else {
    console.error(v.rowSpan);
  }
}, []);

const zipped = zip(countries, expandedHdis)
  .map((v) => v.join(','))
  .join('\n');

console.log(zipped);
