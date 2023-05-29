### Blockers

- the hard part is that underdog dynamically loads the divs that show the players so elements that you create to overlay dont apply to whole list and are deleted as you scroll


- player names are not only unique thing we also could use the data-id attribute


```

<div tabindex="0" class="styles__playerCellWrapper__lTn52" role="button" data-id="60908585-cbf3-4af3-9daf-75859e8b7c3a">...</div>

```

- how to identify player and match them to some specific overlay data



### Main Features
- Display exposure percentages for each player
- Display week 17 opponent for each player




### API Notes
- https://sheets.googleapis.com/v4/spreadsheets/1sLENermMlKCZI79GOnil-X0rr_62FPoxlXjs7azNGDU/values/Exposure%20For%20Upload

#### spreadsheetId : 1sLENermMlKCZI79GOnil-X0rr_62FPoxlXjs7azNGDU


- front end auth with google is annoying to going to use express server backend 