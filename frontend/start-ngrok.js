
import ngrok from 'ngrok';

async function startNgrok() {
  try {
    const url = await ngrok.connect({
      addr: 5174,
      authtoken_from_env: true
    });
    console.log('\n' + '='.repeat(60));
    console.log('🌍 YOUR PUBLIC SECURE URL IS READY!');
    console.log('='.repeat(60));
    console.log('✅ ' + url);
    console.log('\nThis URL is secure (HTTPS) and works anywhere in the world!');
    console.log('Share it with only the people you trust!\n');
  } catch (error) {
    console.error('Error starting ngrok:', error);
    process.exit(1);
  }
}

startNgrok();
