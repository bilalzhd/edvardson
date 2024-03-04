export default function Abbr({ required }: { required: boolean }) {
    if (!required) return null;
    return <abbr className="text-red-500" style={{textDecoration: 'none'}} title="required">*</abbr>
}
