import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Universe } from "src/app/universes/shared/universe.model";

import { environment } from "../../../environments/environment";
import { CharacterReference } from "../characters.model";

@Component({
    selector: "cb-character-list",
    templateUrl: "./character-list.component.html",
    styleUrls: ["./character-list.component.scss"],
})
export class CharacterListComponent {
    @Input() public characters: CharacterReference[];
    @Input() public flush: boolean;
    public hideHiddenCharacters = false;
    @Output() public page = new EventEmitter<number>();
    public pageLimit = environment.characterPageLimit;
    @Output() public search = new EventEmitter<string>();
    @Input() public total: number;
    @Input() public universe: Universe;
    @ViewChild("list") private characterList: HTMLDivElement;

    public constructor(private sanitizer: DomSanitizer) {}

    public genListBackgroundCSS(url?: string) {
        return this.sanitizer.bypassSecurityTrustStyle(
            `linear-gradient(to right, rgba(255, 255, 255, 1.0) 25%, rgba(255, 255, 255, 0.8))${
                url ? `, url(${url}) right` : ""
            }`,
        );
    }

    public getCharacters() {
        return this.characters.filter((c) => {
            if (this.hideHiddenCharacters) {
                return !c.hidden;
            } else {
                return c;
            }
        });
    }

    public getPageCount() {
        console.log(this.total, this.pageLimit, this.total / this.pageLimit);
        return Math.ceil(this.total / this.pageLimit);
    }

    public onPageChange(page: number) {
        if (this.characterList) {
            setTimeout(() => (this.characterList.scrollTop = 0));
        }
        this.page.emit(page);
    }
}
