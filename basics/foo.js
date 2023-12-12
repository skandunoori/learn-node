const args = process.argv.slice(2);
if (args.length > 0) {
    args.forEach((v, i) => console.log(`${v}`));
}
else {
    console.log('Args not found');
}
