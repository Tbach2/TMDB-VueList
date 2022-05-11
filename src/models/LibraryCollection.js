import Collection from "@/models/Collection";
import {LibraryItem} from "@/models/LibraryItems";

export default function LibraryCollection(){
    return new Collection(LibraryItem);

}