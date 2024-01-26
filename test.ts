import * as fs from 'fs-extra';

interface HeartRateEntry {
  timestamps: {
    startTime: string;
    endTime: string;
  };
  beatsPerMinute: number;
}

interface HeartRateData {
  [date: string]: {
    date: string;
    min: number;
    max: number;
    beats: number[];
    latestDataTimestamp: string;
  };
}

function calculateMedian(arr: number[]): number {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArr.length / 2);
  return sortedArr.length % 2 === 0
    ? (sortedArr[middle - 1] + sortedArr[middle]) / 2
    : sortedArr[middle];
}

const data: string = fs.readFileSync('C:\\Users\\SANTHOSH\\Downloads\\TakeHome Assignment_Senior QA\\TakeHome Assignment_Senior QA\\TakeHomeAssignment\\heartrate.json', 'utf8');
const jsonData: HeartRateEntry[] = JSON.parse(data);

const result: HeartRateData = jsonData.reduce((acc: HeartRateData, entry: HeartRateEntry) => {
  const date: string = entry.timestamps.startTime.split('T')[0];

  if (!acc[date]) {
    acc[date] = {
      date,
      min: entry.beatsPerMinute,
      max: entry.beatsPerMinute,
      beats: [entry.beatsPerMinute],
      latestDataTimestamp: entry.timestamps.endTime,
    };
  } else {
    const day = acc[date];
    day.min = Math.min(day.min, entry.beatsPerMinute);
    day.max = Math.max(day.max, entry.beatsPerMinute);
    day.beats.push(entry.beatsPerMinute);
    day.latestDataTimestamp = entry.timestamps.endTime;
  }

  return acc;
}, {});

const output = Object.values(result).map((day) => {
  return {
    date: day.date,
    min: day.min,
    max: day.max,
    median: calculateMedian(day.beats),
    latestDataTimestamp: day.latestDataTimestamp,
  };
});

const outputFileName: string = 'C:\\Users\\SANTHOSH\\Downloads\\TakeHome Assignment_Senior QA\\TakeHome Assignment_Senior QA\\TakeHomeAssignment\\output.json';
fs.writeFile(outputFileName, JSON.stringify(output, null, 2), (err) => {
  if (err) {
    console.error('Error found while writing:', err);
  } else {
    console.log(`Output file Path ${outputFileName}`);
  }
});
