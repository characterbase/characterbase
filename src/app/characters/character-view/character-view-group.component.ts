import { Component, Input, OnChanges } from "@angular/core";

import { CharacterGroup, CharacterGuideGroup } from "../characters.model";

@Component({
    selector: "cb-character-view-group",
    templateUrl: "./character-view-group.component.html",
    styleUrls: ["./character-view-group.component.scss"],
})
export class CharacterViewGroupComponent implements OnChanges {
    @Input() public canViewHidden = false;
    @Input() public characterGroup: CharacterGroup;
    public collapsed = false;
    @Input() public guideGroup: CharacterGuideGroup;

    public getCharacterField(name: string) {
        return this.characterGroup.fields[name];
    }

    public getCharacterFields() {
        return Object.values(this.characterGroup.fields);
    }

    public ngOnChanges() {
        this.collapsed = false;
    }

    public toggleCollapse() {
        this.collapsed = !this.collapsed;
    }
}