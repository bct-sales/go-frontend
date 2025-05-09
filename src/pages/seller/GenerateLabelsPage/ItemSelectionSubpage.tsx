import { Item } from "@/rest/item-data";
import { useSettings } from "@/settings";
import AdvancedItemSelectionSubpage from "./AdvancedItemSelectionSubpage";
import SimpleItemSelectionSubpage from "./SimpleItemSelectionSubpage";

interface Props
{
    items: Item[];
    isItemSelected: (item: Item) => boolean;
    setItemSelection: (item: Item, selected: boolean) => void;
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