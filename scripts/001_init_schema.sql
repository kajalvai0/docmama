-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  project_url TEXT,
  order_index INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments/contact requests table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT,
  preferred_date DATE,
  preferred_time TIME,
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create homepage content table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  button_text TEXT,
  button_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create slides table for smart slides
CREATE TABLE IF NOT EXISTS slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  button_text TEXT,
  button_url TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (username: admin, password: admin123 - hashed)
-- Password hash is bcrypt hash of "admin123"
INSERT INTO admin_users (username, password_hash, email) 
VALUES ('admin', '$2b$10$YOvVVOMm7KPyMVA2m7KeWuBfLfXSBxMhVTh7vFbFG.RnZAVl.Kqjm', 'admin@docmama.com')
ON CONFLICT (username) DO NOTHING;

-- Insert sample slides
INSERT INTO slides (title, description, image_url, button_text, button_url, order_index, is_active) VALUES
('Welcome to Our Professional Services', 'Experience excellence in every aspect of your needs', '/images/slide1.jpg', 'Learn More', '/about', 0, true),
('Expert Solutions for Your Business', 'Tailored services designed specifically for your success', '/images/slide2.jpg', 'Explore Services', '/services', 1, true),
('Transform Your Vision Into Reality', 'Let us help you achieve your goals with our expertise', '/images/slide3.jpg', 'Get Started', '/contact', 2, true)
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO services (title, description, order_index, is_published) VALUES
('Consultation', 'Expert consultation tailored to your unique needs and objectives', 0, true),
('Strategy & Planning', 'Comprehensive strategy development for long-term success', 1, true),
('Implementation', 'Professional implementation of strategic plans and initiatives', 2, true),
('Support & Maintenance', 'Ongoing support to ensure optimal performance', 3, true)
ON CONFLICT DO NOTHING;

-- Insert sample portfolio items
INSERT INTO portfolio_items (title, description, category, order_index, is_published) VALUES
('Project Alpha', 'A breakthrough solution that transformed client operations', 'Business', 0, true),
('Project Beta', 'Innovative approach to solving complex challenges', 'Technology', 1, true),
('Project Gamma', 'Excellence in execution and client satisfaction', 'Design', 2, true)
ON CONFLICT DO NOTHING;

-- Insert sample homepage content
INSERT INTO homepage_content (section_name, title, subtitle, description) VALUES
('hero', 'Professional Portfolio', 'Your Success is Our Priority', 'Welcome to our professional services platform where excellence meets innovation'),
('about', 'About Us', 'Who We Are', 'We are dedicated to providing the highest quality services and solutions'),
('footer', 'Footer', 'Get in Touch', 'Contact us today to discuss how we can help you succeed')
ON CONFLICT (section_name) DO NOTHING;
