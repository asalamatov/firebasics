document.addEventListener('DOMContentLoaded', (e) => {

  const app = firebase.app();

  const db = firebase.firestore();

  const myPost = db.collection('posts').doc('firstpost');

  myPost.onSnapshot(doc => {
      const data = doc.data();
      document.write(data.title + `<br>`)
      document.write(data.views + `<br>`)
      document.write(`
        <button onclick="updatePost()">Update</button><br>
      `)
  })

  const productsRef = db.collection('products');

  const query = productsRef.where('price', '>', 40).orderBy('price', 'desc').limit(3);

  query.get()
    .then(products => {
      products.forEach(doc => {
        data = doc.data();
        document.write(`${data.name} at $${data.price} <br>`)
      })
    })

});

// set myPost.views to 2
const updatePost = () => {
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('firstpost');
  // make it int
  const views = myPost.views
  alert(views)
  myPost.update({
    views: 1
  })
}

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(
      result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user)
      }
  )
    .catch(console.log)
}
