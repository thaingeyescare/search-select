import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  standalone: true,
  selector: "app-search-select",
  templateUrl: "./search-select.component.html",
  styleUrls: ["./search-select.component.scss"],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SearchSelectComponent implements OnChanges, OnInit {
  @Input() data: any[] = [];
  @Input() title: string = "Search";
  @Input() label: string = "Select a User";
  @Input() multiple = false;
  @Input() itemTextField = "name";
  @Input() isLoading = false;
  @Input() initialSelected: any[] = [];
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  @Output() searchChanged: EventEmitter<any> = new EventEmitter();

  public isOpen = false;
  public selected: any = [];
  public filtered: any = [];

  constructor() {}

  ngOnInit() {
    this.updateSelectedOnChange("init");
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateSelectedOnChange("changes");
  }

  updateSelectedOnChange(type: "init" | "changes") {
    // Filter with initial values with checkbox buttons
    if (type === "init" && this.multiple) {
      this.selected = this.initialSelected.map((item) => {
        return { ...item, selected: true };
      });
      this.filtered = [...this.data].map((item) => {
        const item2 = this.selected.find(
          (x: any) => this.leaf(x) === this.leaf(item)
        );

        return item2
          ? { ...item, selected: true }
          : { ...item, selected: false };
      });
      console.log(this.filtered);
      return;
    }

    // Filter on changes with checkbox buttons
    if (type === "changes" && this.multiple) {
      this.filtered = [...this.data];
      this.filtered = [...this.data].map((item) => {
        const item2 = this.selected.find(
          (x: any) => this.leaf(x) === this.leaf(item)
        );

        return item2
          ? { ...item, selected: true }
          : { ...item, selected: false };
      });
      return;
    }

    // Filter with initial values with radio buttons
    if (type === "init" && !this.multiple) {
      this.filtered = [...this.data];
      return;
    }

    // Filter on changes with radio buttons
    if (type === "changes" && !this.multiple) {
      this.selected = this.initialSelected;
      this.filtered = [...this.data];
      return;
    }
  }

  open() {
    this.isOpen = true;
  }

  cancel() {
    this.resetFilter();
    this.isOpen = false;
  }

  confirm() {
    this.selectedChanged.emit(this.selected);
    this.isOpen = false;
    setTimeout(() => {
      this.resetFilter();
    }, 300);
  }

  itemSelected(item: any) {
    // is selected, add to selected list
    if (item.selected) {
      this.selected = [...this.selected, item];
    }

    // not selected, remove from selected list
    if (!item.selected) {
      let filteredItems = this.selected.filter((x: any) => {
        return this.leaf(x) !== this.leaf(item);
      });
      this.selected = filteredItems;
    }
  }

  itemSelectedSingle(e: any) {
    this.selected = [e.target.value];
  }

  filter(value: string | null | undefined) {
    if (!value) {
      return this.resetFilter();
    }

    const filter = value!.toLowerCase();
    this.searchChanged.emit(filter);
  }

  resetFilter() {
    this.searchChanged.emit("");
  }

  // Allows for dynamic input of object path
  leaf = (obj: any) =>
    this.itemTextField.split(".").reduce((value, el) => value[el], obj);
}
