navigation folder structure 

app/
 ├── _layout.tsx              ← Root navigation logic (Auth vs App)
 ├── index.tsx                ← Splash/Loading screen
 ├── (auth)/                  ← Not logged-in screens
 │     ├── _layout.tsx
 │     ├── login.tsx
 │     └── register.tsx
 ├── (app)/                   ← Logged-in app
 │     ├── _layout.tsx
 │     ├── (tabs)/            ← Bottom Tabs
 │     │     ├── _layout.tsx
 │     │     ├── home.tsx
 │     │     ├── search.tsx
 │     │     └── profile.tsx
 │     └── details.tsx        ← Example Stack screen in the app
 └── modal.tsx
