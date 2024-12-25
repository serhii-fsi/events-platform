import { Textarea } from '@/shadcnui/textarea';
import { Button, buttonVariants } from '@/shadcnui/button';
import { Input } from '@/shadcnui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shadcnui/select';
import { DatePicker } from '@/shadcnui/datepicker';

export default async function Page() {
  return (
    <div>
      <h1 className="">Create Event</h1>

      <div>
        <Input placeholder="Event Title" />

        <Textarea placeholder="Event Description" />
      </div>
      <div>
        <DatePicker placeholder="Start Date" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DatePicker placeholder="End Date" />
      </div>
    </div>
  );
}
