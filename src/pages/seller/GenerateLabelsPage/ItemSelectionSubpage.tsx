import { Item } from "@/rest/item-data";
import { useSettings } from "@/settings";
import AdvancedItemSelectionSubpage from "./AdvancedItemSelectionSubpage";
import SimpleItemSelectionSubpage from "./SimpleItemSelectionSubpage";

interface Props
{
    items: Item[];
    count: (item: Item) => number;
    setCount: (item: Item, selected: number) => void;
}

export default function ItemSelectionSubpage(props: Props): React.ReactNode
{
    const settings = useSettings();

    if ( settings.advancedMode )
    {
        return <AdvancedItemSelectionSubpage {...props} />;
    }
    else
    {
        return <SimpleItemSelectionSubpage {...props} />;
    }
}