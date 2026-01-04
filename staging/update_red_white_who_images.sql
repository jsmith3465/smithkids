-- Update images for Red White and Who individuals
-- Generated from American_History_Icons_Complete.xlsx
-- This will update existing records based on name

-- George Washington
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Washington_Crossing_the_Delaware_by_Emanuel_Leutze,_MMA-NYC,_1851.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Washington_Crossing_the_Delaware_by_Emanuel_Leutze,_MMA-NYC,_1851.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/4/43/Scene_at_the_Signing_of_the_Constitution_of_the_United_States.png',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Surrender_of_Lord_Cornwallis.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/1/12/Gilbert_Stuart,_George_Washington_(Lansdowne_portrait,_1796).jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Valley_Forge_Prayer_Plaque.JPG',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/5/51/General_George_Washington_Resigning_His_Commission.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Washington''s_Headquarters_at_Valley_Forge.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/7/76/Mount_Vernon_2013.JPG',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/2/23/US_one_dollar_bill,_obverse,_series_2009.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Washington_quarter_obverse.jpg',
    updated_at = NOW()
WHERE name = 'George Washington';

-- Benjamin Franklin
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Benjamin-Franklin-We-must-all-hang-together.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Benjamin-Franklin-We-must-all-hang-together.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Benjamin_Franklin_Drawing_Electricity_from_the_Sky_c1816.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Join,_or_Die.svg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/6/63/Franklin_stove,_1795.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Poor_Richard_Almanack_1739.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/80/Committee_of_Five,_1776.png',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/US100FaceLeaf.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/3/39/Independence_Hall.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Franklin_Court_Philadelphia.jpg',
    updated_at = NOW()
WHERE name = 'Benjamin Franklin';

-- Abraham Lincoln
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Emancipation_proclamation.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Emancipation_proclamation.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Lincoln_Memorial_Reflecting_Pool.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Gettysburg_Address,_Pennsylvania_Memorial.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/6/69/Lincoln_log_cabin_replica.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Lincoln_and_Tad.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/7/71/Ford''s_Theatre_interior.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/9/97/Lincolncabinet.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/US_$5_Series_2006_obverse.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/3/33/2010_cent_obverse.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/8/86/Lincoln_Home_National_Historic_Site.jpg',
    updated_at = NOW()
WHERE name = 'Abraham Lincoln';

-- Thomas Jefferson
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Thomas_Jefferson_Memorial_with_trees.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Monticello_2010-10-29.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Lewis_and_clark-expedition.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Louisiana_Purchase.png',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Rotunda_UVa_from_south.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/8f/United_States_Declaration_of_Independence.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/6/62/US_Nickel_2013_Obv.png',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/1/13/Jefferson_Memorial_At_Dusk_1.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Shadwell_historical_marker.jpg',
    updated_at = NOW()
WHERE name = 'Thomas Jefferson';

-- Harriet Tubman
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Harriet_Tubman_late_in_life3.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Harriet_Tubman_late_in_life3.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Underground_Railroad_in_Eastern_Indiana_(map).jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Harriet_Tubman_Home_for_the_Aged.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Harriet_Tubman_Memorial_Statue.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/d/da/Auburn,_New_York_-_Fort_Hill_Cemetery_-_Harriet_Tubman_Grave.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Harriet_Tubman_postage_stamp.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Underground_railroad_geographic_routes.svg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Maryland_Eastern_Shore.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Civil_War_Union_soldiers.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/0/04/National_Museum_of_African_American_History.jpg',
    updated_at = NOW()
WHERE name = 'Harriet Tubman';

-- Frederick Douglass
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/1/17/Frederick_Douglass_(1818-1895).jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/1/17/Frederick_Douglass_(1818-1895).jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Narrative_of_the_Life_of_Frederick_Douglass_(title_page).jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/0/02/The_North_Star_(anti-slavery_newspaper).jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Frederick_Douglass_as_a_younger_man.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/3/39/Frederick_Douglass_portrait,_circa_1879.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/4/43/Frederick_Douglass_c1840s.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Frederick_Douglass_Monument.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Frederick_Douglass_National_Historic_Site.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_stamp.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Rochester,_New_York.jpg',
    updated_at = NOW()
WHERE name = 'Frederick Douglass';

-- Theodore Roosevelt
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/1/11/Theodore_Roosevelt_as_Colonel_of_Rough_Riders.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/1/11/Theodore_Roosevelt_as_Colonel_of_Rough_Riders.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Rough_Riders_at_San_Juan_Hill.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Panama_Canal_under_construction,_1907.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Mountrushmore.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Theodore_Roosevelt_and_John_Muir.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Grand_Canyon_view.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/1/11/Teddy_bear_early_1900s.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Nobel_Prize.png',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Sagamore_Hill_National_Historic_Site.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Theodore_Roosevelt_statue_AMNH.jpg',
    updated_at = NOW()
WHERE name = 'Theodore Roosevelt';

-- Martin Luther King Jr.
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/March_on_washington_Aug_28_1963.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/March_on_washington_Aug_28_1963.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Martin_Luther_King_-_March_on_Washington.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Civil_Rights_March_on_Washington,_D.C._-_NARA_-_542010.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/1/17/MLK_Memorial.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Selma_to_Montgomery_Marches.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Letter_from_a_Birmingham_Jail.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Nobel_Peace_Prize.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ebenezer_Baptist_Church.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/6/65/MLK_stamp.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/8/82/Montgomery,_Alabama.jpg',
    updated_at = NOW()
WHERE name = 'Martin Luther King Jr.';

-- Rosa Parks
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Rosa_Parks_Bus.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Rosa_Parks_Bus.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/7/73/Montgomery_Bus_Boycott_flyer.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Civil_Rights_Memorial.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Rosa_Parks_(14613963652).jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Martin_Luther_King_Jr_and_other_civil_rights_leaders_1963.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Rosa_Parks_Library_and_Museum.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Presidential_Medal_of_Freedom.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/2/29/US_Capitol_Rotunda.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Civil_Rights_Movement.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Detroit,_Michigan.jpg',
    updated_at = NOW()
WHERE name = 'Rosa Parks';

-- Sacagawea
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Lewis_and_clark-expedition.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Lewis_and_clark-expedition.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Lewis_and_Clark_Expedition.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Sacagawea_statue.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/6/68/Lewis_and_Clark_map.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Fort_Clatsop_reconstruction.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Three_Forks,_Montana.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Columbia_River_Gorge.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Shoshone_National_Forest.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Pacific_Ocean_coastline.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/6/68/Lewis_and_Clark_Caverns.jpg',
    updated_at = NOW()
WHERE name = 'Sacagawea';

-- Thomas Edison
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Thomas_Edison_and_phonograph_edit1.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Thomas_Edison_and_phonograph_edit1.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/7/76/Edison_bulb.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/0/01/Menlo_Park_Museum.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Kinetoscope.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Edison_phonograph.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Thomas_Edison_in_his_laboratory.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Edison_patents.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/5/52/Thomas_Edison_National_Historical_Park.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Motion_picture_camera.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/9/94/West_Orange,_New_Jersey.jpg',
    updated_at = NOW()
WHERE name = 'Thomas Edison';

-- Alexander Graham Bell
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bell_Telephone_Patent.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bell_Telephone_Patent.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Bell''s_telephone.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Alexander_Graham_Bell''s_Telephone_Patent_Drawing.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Bell_Telephone_Company.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/8/80/Alexander_Graham_Bell_and_wife_Mabel.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/National_Geographic_Society.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Bell''s_laboratory.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Deaf_education.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/AT%26T_Building.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Baddeck,_Nova_Scotia.jpg',
    updated_at = NOW()
WHERE name = 'Alexander Graham Bell';

-- Wright Brothers (Orville & Wilbur)
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/8/86/First_flight2.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/8/86/First_flight2.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Wrightflyer.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Wright_Brothers_Bicycle_Shop.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Wind_tunnel_replica.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Kill_Devil_Hills,_North_Carolina.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Orville_Wright.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Wilbur_Wright.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wright_Brothers_National_Memorial.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Wright_Flyer_in_the_National_Air_and_Space_Museum.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Dayton,_Ohio.jpg',
    updated_at = NOW()
WHERE name = 'Wright Brothers (Orville & Wilbur)';

-- Neil Armstrong
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/2/27/Apollo_11_insignia.png',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/1/16/Apollo_11_Launch_-_GPN-2000-000630.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Buzz_salutes_the_U.S._Flag.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/4/4a/NASA_Apollo_11_Lunar_Module_Eagle.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Apollo_11_Crew.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Apollo_11_bootprint.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Apollo_11_mission_patch.svg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Wapakoneta,_Ohio.jpg',
    updated_at = NOW()
WHERE name = 'Neil Armstrong';

-- Jackie Robinson
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/0/09/Ebbets_Field.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/0/09/Ebbets_Field.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/7/78/Jackie_Robinson_1950.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Jackie_Robinson_statue.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Branch_Rickey.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Brooklyn_Dodgers_logo.svg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/6/63/Jackie_Robinson_Day.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Hall_of_Fame_plaque.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Dodger_Stadium.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/0/0f/42_film_poster.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Cairo,_Georgia.jpg',
    updated_at = NOW()
WHERE name = 'Jackie Robinson';

-- Amelia Earhart
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Amelia_Earhart_1935.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Amelia_Earhart_1935.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Amelia_Earhart_with_her_Lockheed_Vega_5B.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Amelia_Earhart_-_GPN-2002-000211.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Lockheed_Electra_10E.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/2/21/Fred_Noonan.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Pacific_Ocean.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Howland_Island.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Distinguished_Flying_Cross_(United_States).jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Amelia_Earhart_postage_stamp.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Atchison,_Kansas.jpg',
    updated_at = NOW()
WHERE name = 'Amelia Earhart';

-- Ulysses S. Grant
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Surrender_of_Confederate_General_Robert_E._Lee.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Surrender_of_Confederate_General_Robert_E._Lee.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Vicksburg_Campaign.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Appomattox_Court_House_National_Historical_Park.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/d/da/Grant''s_Tomb.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/7/79/US50FaceLeaf.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/1/17/Personal_Memoirs_of_U.S._Grant.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Battle_of_Shiloh.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/b/bf/White_House_Grant_administration.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Civil_War_Union_Army.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Point_Pleasant,_Ohio.jpg',
    updated_at = NOW()
WHERE name = 'Ulysses S. Grant';

-- Susan B. Anthony
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Elizabeth_Cady_Stanton_and_Susan_B._Anthony.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Elizabeth_Cady_Stanton_and_Susan_B._Anthony.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Susan_B._Anthony_dollar_obverse.png',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Nineteenth_Amendment_to_the_United_States_Constitution.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Women''s_suffrage_parade.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Susan_B._Anthony_House.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Seneca_Falls_Convention.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Women''s_rights_movement.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Susan_B._Anthony_postage_stamp.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Rochester,_New_York.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Adams,_Massachusetts.jpg',
    updated_at = NOW()
WHERE name = 'Susan B. Anthony';

-- Clara Barton
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/American_Red_Cross_logo.svg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/American_Red_Cross_logo.svg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/8/86/Civil_War_hospital.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/1/19/Clara_Barton_National_Historic_Site.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Antietam_battlefield.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Red_Cross_flag.svg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Civil_War_nurse.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Clara_Barton_postage_stamp.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/4/46/International_Red_Cross.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Glen_Echo,_Maryland.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Oxford,_Massachusetts.jpg',
    updated_at = NOW()
WHERE name = 'Clara Barton';

-- John Adams
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Abigail_Adams.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Abigail_Adams.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Adams_National_Historical_Park.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Boston_Massacre.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Continental_Congress.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/John_Adams_Presidential_$1_Coin_obverse.png',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/2/28/White_House.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Peacefield.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Harvard_University.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Quincy,_Massachusetts.jpg',
    updated_at = NOW()
WHERE name = 'John Adams';

-- Alexander Hamilton
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/9/93/US10FaceLeaf.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/9/93/US10FaceLeaf.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Federalist_Papers.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Hamilton-burr-duel.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Yorktown_Victory_Monument.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/First_Bank_of_the_United_States.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/0/06/US_Treasury_Building.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Hamilton_Grange_National_Memorial.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Aaron_Burr.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Columbia_University.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/8/86/Nevis_island.jpg',
    updated_at = NOW()
WHERE name = 'Alexander Hamilton';

-- Franklin D. Roosevelt
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/2/22/Eleanor_Roosevelt_portrait_1933.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/2/22/Eleanor_Roosevelt_portrait_1933.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/d/de/New_Deal_agencies.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Franklin_D._Roosevelt_Memorial.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pearl_Harbor_attack.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Roosevelt_dime.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/1/11/Social_Security_card.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/0/06/World_War_II.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/9/93/Warm_Springs,_Georgia.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/b/be/Hyde_Park,_New_York.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Great_Depression.jpg',
    updated_at = NOW()
WHERE name = 'Franklin D. Roosevelt';

-- John F. Kennedy
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/9/93/PT-109.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/9/93/PT-109.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/f/fd/JFK_inauguration.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Cuban_Missile_Crisis.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/0/09/Peace_Corps_logo.svg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Apollo_program_insignia.png',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Kennedy_half_dollar.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/83/John_F._Kennedy_Presidential_Library.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/3/36/JFK_Eternal_Flame.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Dealey_Plaza.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/6/67/Brookline,_Massachusetts.jpg',
    updated_at = NOW()
WHERE name = 'John F. Kennedy';

-- Ronald Reagan
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Ronald_Reagan_actor.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Ronald_Reagan_actor.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Berlin_Wall.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Reagan_and_Gorbachev.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Brandenburg_Gate.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Reagan_assassination_attempt.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/9/92/Ronald_Reagan_Presidential_Library.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/1/18/Nancy_Reagan.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/8/87/Cold_War_map.png',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Reagan_postage_stamp.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Tampico,_Illinois.jpg',
    updated_at = NOW()
WHERE name = 'Ronald Reagan';

-- Helen Keller
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/8/80/Helen_Keller_with_Anne_Sullivan.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/8/80/Helen_Keller_with_Anne_Sullivan.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/9/92/Helen_Keller_reading_braille.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Braille.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Perkins_School_for_the_Blind.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Helen_Keller_birthplace.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/1/13/Helen_Keller_postage_stamp.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Anne_Sullivan.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Radcliffe_College.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Sign_language.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Tuscumbia,_Alabama.jpg',
    updated_at = NOW()
WHERE name = 'Helen Keller';

-- George Washington Carver
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tuskegee_University.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tuskegee_University.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Peanut_plant.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/4/42/Sweet_potato.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/George_Washington_Carver_National_Monument.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/0/06/Booker_T._Washington.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Carver_in_laboratory.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/George_Washington_Carver_postage_stamp.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Crop_rotation.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tuskegee,_Alabama.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Diamond,_Missouri.jpg',
    updated_at = NOW()
WHERE name = 'George Washington Carver';

-- Sojourner Truth
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sojourner_Truth_carte_de_visite.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sojourner_Truth_carte_de_visite.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Abolition_movement.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/4/43/Women''s_rights_convention.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sojourner_Truth_Memorial_Statue.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Battle_Creek,_Michigan.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Sojourner_Truth_postage_stamp.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/88/Underground_Railroad.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Abraham_Lincoln.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Freedmen''s_Bureau.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Ulster_County,_New_York.jpg',
    updated_at = NOW()
WHERE name = 'Sojourner Truth';

-- Booker T. Washington
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tuskegee_University.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tuskegee_University.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/0/07/Up_From_Slavery.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/9/97/Hampton_University.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Theodore_Roosevelt.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Atlanta_Cotton_States_Exposition.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/W._E._B._Du_Bois.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/b/be/Tuskegee_Institute.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Booker_T._Washington_postage_stamp.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/2/21/Vocational_education.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Franklin_County,_Virginia.jpg',
    updated_at = NOW()
WHERE name = 'Booker T. Washington';

-- Dwight D. Eisenhower
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Eisenhower_as_General.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Eisenhower_as_General.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/D-Day.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Normandy_Invasion.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/7/76/Interstate_Highway_System.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Little_Rock_Nine.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/West_Point_Military_Academy.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Eisenhower_dollar.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Korean_War.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Abilene,_Kansas.jpg',
    updated_at = NOW()
WHERE name = 'Dwight D. Eisenhower';

-- Daniel Boone
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Cumberland_Gap.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Cumberland_Gap.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/9/96/Wilderness_Road.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Fort_Boonesborough.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/8/80/Kentucky_wilderness.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Pioneer_cabin.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/2/27/Shawnee.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Frontier_settlement.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/1/16/Daniel_Boone_statue.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Appalachian_Mountains.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Berks_County,_Pennsylvania.jpg',
    updated_at = NOW()
WHERE name = 'Daniel Boone';

-- Davy Crockett
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/The_Alamo.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/The_Alamo.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Battle_of_the_Alamo.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Tennessee_frontier.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/d/df/United_States_Capitol.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Coonskin_cap.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/7/74/Texas_Revolution.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Remember_the_Alamo.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/c/c0/San_Antonio,_Texas.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Davy_Crockett_Almanac.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Greene_County,_Tennessee.jpg',
    updated_at = NOW()
WHERE name = 'Davy Crockett';

-- Henry Ford
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ford_Model_T.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ford_Model_T.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Ford_assembly_line.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Highland_Park_Ford_Plant.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Ford_Motor_Company.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Quadricycle.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Rouge_River_Plant.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Five_dollar_day.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/7/78/The_Henry_Ford_Museum.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/6/65/Greenfield_Village.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Dearborn,_Michigan.jpg',
    updated_at = NOW()
WHERE name = 'Henry Ford';

-- Eleanor Roosevelt
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Franklin_D._Roosevelt.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Franklin_D._Roosevelt.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/a/aa/United_Nations.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Universal_Declaration_of_Human_Rights.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/7/78/My_Day_column.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Marian_Anderson.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Harry_Truman.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Val-Kill.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Eleanor_Roosevelt_postage_stamp.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/6/64/First_Lady.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/New_York_City.jpg',
    updated_at = NOW()
WHERE name = 'Eleanor Roosevelt';

-- Paul Revere
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/8/80/The_Midnight_Ride_of_Paul_Revere.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/8/80/The_Midnight_Ride_of_Paul_Revere.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Old_North_Church.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Boston_Tea_Party.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Boston_Massacre.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/6/67/Sons_of_Liberty.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Lexington_and_Concord.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Paul_Revere_House.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Paul_Revere_silverwork.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/0/01/Paul_Revere_statue.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Boston,_Massachusetts.jpg',
    updated_at = NOW()
WHERE name = 'Paul Revere';

-- James Madison
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Constitution_of_the_United_States.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Constitution_of_the_United_States.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Bill_of_Rights.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Federalist_Papers.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Dolley_Madison.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/9/90/Montpelier,_Virginia.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/War_of_1812.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Burning_of_Washington.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Constitutional_Convention.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Princeton_University.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Port_Conway,_Virginia.jpg',
    updated_at = NOW()
WHERE name = 'James Madison';

-- Patrick Henry
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Give_me_liberty_or_give_me_death.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Give_me_liberty_or_give_me_death.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Virginia_House_of_Burgesses.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/0/07/Stamp_Act.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Virginia_Ratifying_Convention.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Red_Hill_Patrick_Henry_National_Memorial.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/5/56/Revolutionary_War.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/St._John''s_Church,_Richmond.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Patrick_Henry_postage_stamp.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Hanover_County,_Virginia.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/b/be/Virginia_Governor.jpg',
    updated_at = NOW()
WHERE name = 'Patrick Henry';

-- John Hancock
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/8/86/John_Hancock_signature.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/8/86/John_Hancock_signature.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Hancock_House.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Continental_Congress.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Boston_Tea_Party.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Liberty.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Massachusetts_State_House.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/6/67/Sons_of_Liberty.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Harvard_University.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Braintree,_Massachusetts.jpg',
    updated_at = NOW()
WHERE name = 'John Hancock';

-- Samuel Adams
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Boston_Tea_Party.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Boston_Tea_Party.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/6/67/Sons_of_Liberty.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Boston_Massacre.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Continental_Congress.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/4/48/Committees_of_Correspondence.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Massachusetts_State_House.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Samuel_Adams_statue.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/0/01/Faneuil_Hall.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Boston,_Massachusetts.jpg',
    updated_at = NOW()
WHERE name = 'Samuel Adams';

-- Robert E. Lee
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Surrender_of_Confederate_General_Robert_E._Lee.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Surrender_of_Confederate_General_Robert_E._Lee.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/3/33/Battle_of_Gettysburg.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Appomattox_Court_House_National_Historical_Park.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/8/85/Arlington_House,_The_Robert_E._Lee_Memorial.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/West_Point_Military_Academy.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/3/31/Confederate_States_of_America.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Traveller_(horse).jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/6/64/Washington_and_Lee_University.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/4/48/Lee_Chapel.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Westmoreland_County,_Virginia.jpg',
    updated_at = NOW()
WHERE name = 'Robert E. Lee';

-- Andrew Jackson
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/3/35/Battle_of_New_Orleans.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/3/35/Battle_of_New_Orleans.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Trail_of_Tears.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/The_Hermitage_(Nashville,_Tennessee).jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/4/41/US20FaceLeaf.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Indian_Removal_Act.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Democratic_Party_(United_States).jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/3/34/Jackson_inauguration.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/War_of_1812.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/0/03/Cherokee_Nation.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Waxhaws_region.jpg',
    updated_at = NOW()
WHERE name = 'Andrew Jackson';

-- John Muir
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Yosemite_Valley.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Yosemite_Valley.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Theodore_Roosevelt_and_John_Muir.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/0/01/Sierra_Club_logo.svg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Sequoia_National_Park.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Yellowstone_National_Park.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/1/11/Half_Dome.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Muir_Woods_National_Monument.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/8/8e/California_quarter.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Glacier_Point.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Dunbar,_Scotland.jpg',
    updated_at = NOW()
WHERE name = 'John Muir';

-- Mark Twain
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/2/26/Adventures_of_Tom_Sawyer_cover.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/2/26/Adventures_of_Tom_Sawyer_cover.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/7/79/Adventures_of_Huckleberry_Finn.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/7/78/Mississippi_River.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/8/86/Hannibal,_Missouri.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Steamboat.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Mark_Twain_House.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/5/55/A_Connecticut_Yankee_in_King_Arthur''s_Court.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/7/79/Mark_Twain_postage_stamp.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hartford,_Connecticut.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Florida,_Missouri.jpg',
    updated_at = NOW()
WHERE name = 'Mark Twain';

-- Thurgood Marshall
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Supreme_Court_of_the_United_States.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Supreme_Court_of_the_United_States.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Brown_v._Board_of_Education.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/NAACP_logo.svg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/6/67/Howard_University.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/b/bc/School_integration.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Supreme_Court_Justices.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/7/74/Civil_rights.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/7/73/Thurgood_Marshall_postage_stamp.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Baltimore,_Maryland.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/8/80/Separate_but_equal.jpg',
    updated_at = NOW()
WHERE name = 'Thurgood Marshall';

-- John Lewis
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/March_on_washington_Aug_28_1963.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/March_on_washington_Aug_28_1963.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Selma_to_Montgomery_Marches.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/5/58/Edmund_Pettus_Bridge.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Freedom_Riders.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/SNCC.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/d/df/United_States_Capitol.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/85/Voting_Rights_Act.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/6/66/Good_Trouble.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/0/07/Bloody_Sunday_1965.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Troy,_Alabama.jpg',
    updated_at = NOW()
WHERE name = 'John Lewis';

-- Walt Disney
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Mickey_Mouse.svg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Mickey_Mouse.svg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Disneyland.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Snow_White_poster.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/8/84/Cinderella_Castle.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Academy_Award.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Walt_Disney_Studios.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Fantasia.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/9/97/Walt_Disney_World.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Steamboat_Willie.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Chicago,_Illinois.jpg',
    updated_at = NOW()
WHERE name = 'Walt Disney';

-- Cesar Chavez
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/United_Farm_Workers.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/United_Farm_Workers.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/1/13/Grape_boycott.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/4/43/Farm_workers.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Delano_grape_strike.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Sí_se_puede.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/8/88/California_agriculture.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/1/18/Cesar_Chavez_postage_stamp.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/0/01/Hunger_strike.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Presidential_Medal_of_Freedom.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Yuma,_Arizona.jpg',
    updated_at = NOW()
WHERE name = 'Cesar Chavez';

-- Sitting Bull
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Battle_of_Little_Bighorn.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Battle_of_Little_Bighorn.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/6/68/Custer''s_Last_Stand.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/6/65/Lakota_Sioux.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Standing_Rock_Indian_Reservation.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/3/34/Buffalo_hunt.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/6/69/Buffalo_Bill''s_Wild_West_Show.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Crazy_Horse.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/d/db/Great_Plains.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Wounded_Knee.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Grand_River,_South_Dakota.jpg',
    updated_at = NOW()
WHERE name = 'Sitting Bull';

-- Audie Murphy
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Medal_of_Honor.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Medal_of_Honor.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/World_War_II_in_Europe.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/To_Hell_and_Back.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/2/21/D-Day_invasion.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/8/87/United_States_Army.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Hollywood.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/6/63/Arlington_National_Cemetery.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Western_film.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/PTSD.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Kingston,_Texas.jpg',
    updated_at = NOW()
WHERE name = 'Audie Murphy';

-- Pocahontas
UPDATE red_white_who_individuals
SET main_photo_url = 'https://upload.wikimedia.org/wikipedia/commons/6/65/Jamestown_Settlement.jpg',
    photo_gallery_1 = 'https://upload.wikimedia.org/wikipedia/commons/6/65/Jamestown_Settlement.jpg',
    photo_gallery_2 = 'https://upload.wikimedia.org/wikipedia/commons/3/39/John_Smith_explorer.jpg',
    photo_gallery_3 = 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Powhatan_Confederacy.jpg',
    photo_gallery_4 = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/John_Rolfe.jpg',
    photo_gallery_5 = 'https://upload.wikimedia.org/wikipedia/commons/7/78/Virginia_Colony.jpg',
    photo_gallery_6 = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Pocahontas_statue.jpg',
    photo_gallery_7 = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/English_colonists.jpg',
    photo_gallery_8 = 'https://upload.wikimedia.org/wikipedia/commons/9/95/St._George''s_Church,_Gravesend.jpg',
    photo_gallery_9 = 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Native_American.jpg',
    photo_gallery_10 = 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Tobacco.jpg',
    updated_at = NOW()
WHERE name = 'Pocahontas';
