# Fabsava Music Mobile App

React Native mobil uygulaması - Expo ile geliştirilmiş basit chat arayüzü.

## 📱 Özellikler

- **Basit Chat Arayüzü**: Temiz ve kullanıcı dostu tasarım
- **Real-time Mesajlaşma**: Backend API ile anlık iletişim
- **AI Asistan**: Müzik ve hava durumu konularında yardım
- **Cross-platform**: iOS ve Android desteği

## 🚀 Kurulum

### Gereksinimler
- Node.js >= 18
- Expo CLI
- Expo Go uygulaması (telefonda)

### Adımlar

1. **Dependency'leri yükle**:
```bash
npm install
```

2. **Expo server'ı başlat**:
```bash
npm start
# veya
npx expo start
```

3. **Telefonda test et**:
   - Expo Go uygulamasını indir
   - QR kodu tara
   - Uygulamayı aç

## 🔧 Konfigürasyon

### Backend Bağlantısı
`App.tsx` dosyasında API URL'ini değiştir:

```typescript
const response = await fetch('http://YOUR_IP:8080/api/chat', {
  // ...
});
```

### Expo Konfigürasyonu
`app.json` dosyasında uygulama ayarlarını değiştir:

```json
{
  "expo": {
    "name": "Fabsava Music",
    "slug": "fabsava-music",
    // ...
  }
}
```

## 📱 Kullanım

1. **Uygulamayı aç**
2. **Mesaj yaz**: Alt kısımdaki text input'a mesajını yaz
3. **Gönder**: Sağ taraftaki gönder butonuna bas
4. **Cevap bekle**: AI asistan cevap verecek

### Örnek Sorular
- "İstanbul'da hava nasıl?"
- "Taylor Swift şarkıları ara"
- "Yağmurlu hava için müzik öner"
- "Trend müzikleri göster"

## 🎨 UI Bileşenleri

- **React Native Paper**: Material Design bileşenleri
- **Expo Vector Icons**: İkonlar
- **Custom Styling**: Özel tasarım

## 🔧 Geliştirme

### Hot Reload
Expo otomatik olarak değişiklikleri algılar ve uygulamayı yeniler.

### Debug
```bash
npx expo start --dev-client
```

### Build
```bash
# Android APK
npx expo build:android

# iOS IPA
npx expo build:ios
```

## 📦 Deployment

### Expo Publish
```bash
npx expo publish
```

### App Store / Play Store
Expo'nun build servisini kullan veya EAS Build ile deploy et.

## 🐛 Sorun Giderme

### Backend Bağlantı Sorunu
- Backend server'ın çalıştığından emin ol
- IP adresini kontrol et
- CORS ayarlarını kontrol et

### Expo Sorunları
```bash
# Cache temizle
npx expo start --clear

# Node modules yeniden yükle
rm -rf node_modules
npm install
```

## 📄 Lisans

ISC License
