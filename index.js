import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Buy bread" },
];

function addItem(title) {
  const lastId = items.length > 0 ? items[items.length - 1].id : 0;
  const newItem = {
    id: lastId + 1,
    title: title,
  };
  items.push(newItem); 
}

function deleteItemById(id) {
    const itemId = Number(id); 
    items = items.filter(item => item.id !== itemId); 
}

function editItemTitleById(id, newTitle) {
    const itemId = Number(id); 
    const item = items.find(item => item.id === itemId); 
    if (item) {
        item.title = newTitle; 
    } else {
        console.log("Item não encontrado");
    }
}

app.get("/", (req, res) => {
  try {
    res.render("index", {
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", (req, res) => {
    const item = req.body.newItem;
    try {
        addItem(item);
        console.log(items);
        
        res.redirect("/");
    } catch (err) {
        console.log(err);
        
    }
});

app.post("/edit", (req, res) => {
    try {
        const edit = req.body.updatedItemTitle;
        const editId = req.body.updatedItemId;

        editItemTitleById(editId, edit);

        res.redirect("/");
    } catch (err) {
        console.log(err);
        
    }
})

app.post("/delete", (req, res) => {
    const deletedId = req.body.deleteItemId;
    try {
        deleteItemById(deletedId);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
