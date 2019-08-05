async function loadData() {
  try {
    const res = await fetch("./dataset.json");
    const json = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
}

function UIdata(dataset) {
  // FUNCTION THAT DOES ALL THE WORK
  function createMetaDataTemplate(obj) {
    // console.clear();
    const reducedKeys = (acc, item) => {
      let set = new Set(acc);
      for (const [key, value] of Object.entries(item)) {
        //JULY 26 2019 -- this if statement is temporary
        if (typeof value !== "object") {
          set.add(key);
        }
      }
      return [...set];
    };

    const objKeys = obj.reduce(reducedKeys, []);

    const keysDetails = (object, detail) => {
      let details = object.map(arrayElement => {
        return arrayElement[detail];
      });
      let set = new Set();
      for (detail of details) {
        set.add(detail);
      }
      const filterSet = [...set].filter(item => item !== undefined);
      const mappedSet = filterSet.map(item => {
        //EXPERIMENTAL CODE FOR NESTED OBJECTS
        if (typeof item === "object") {
          // return createMetaDataTemplate(item);
          // return JSON.stringify(item);
          return item;
        }
        //END OF EXPERIEMENTAL CODE
        return item;
      });
      return mappedSet;
    };
    //Map version of itemDetails
    const itemDetails = details => {
      let map = new Map();
      for (const detail of details) {
        map.set(detail, keysDetails(obj, detail));
      }
      return map;
    };
    return itemDetails(objKeys);
  }

  // OPTIONAL: for truncated output meant for UI

  function simplifiedOutput(mappedObject, length) {
    const map1 = new Map();
    const mapped = [...mappedObject.values()]
      .filter(item => item.length < length)
      .map(detail => {
        const map2 = new Map();
        return map2.set(
          [...mappedObject.keys()].filter(key =>
            mappedObject.get(key).includes(detail[0])
          ),
          detail
        );
      });
    for (const item of mapped) {
      for (const key of item.keys()) {
        map1.set(...key, ...item.values());
      }
    }
    return map1;
  }

  return createMetaDataTemplate(dataset);
}

export { loadData, UIdata };
