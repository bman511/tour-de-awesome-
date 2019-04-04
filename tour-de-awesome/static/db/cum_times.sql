ALTER TABLE race_stages ADD COLUMN cum_distance INT(11) AFTER stage_distance;
select * from race_stages;

UPDATE race_stages SET cum_distance = 201 where stage_id=1;
UPDATE race_stages SET cum_distance=384 WHERE stage_id=2;
UPDATE race_stages SET cum_distance=420 WHERE stage_id=3;
UPDATE race_stages SET cum_distance=615 WHERE stage_id=4;
UPDATE race_stages SET cum_distance=820 WHERE stage_id=5;
UPDATE race_stages SET cum_distance=1001 WHERE stage_id=6;
UPDATE race_stages SET cum_distance=1232 WHERE stage_id=7;
UPDATE race_stages SET cum_distance=1413 WHERE stage_id=8;
UPDATE race_stages SET cum_distance=1570 WHERE stage_id=9;
UPDATE race_stages SET cum_distance=1729 WHERE stage_id=10;
UPDATE race_stages SET cum_distance=1838 WHERE stage_id=11;
UPDATE race_stages SET cum_distance=2014 WHERE stage_id=12;
UPDATE race_stages SET cum_distance=2184 WHERE stage_id=13;
UPDATE race_stages SET cum_distance=2372 WHERE stage_id=14;
UPDATE race_stages SET cum_distance=2554 WHERE stage_id=15;
UPDATE race_stages SET cum_distance=2772 WHERE stage_id=16;
UPDATE race_stages SET cum_distance=2837 WHERE stage_id=17;
UPDATE race_stages SET cum_distance=3008 WHERE stage_id=18;
UPDATE race_stages SET cum_distance=3209 WHERE stage_id=19;
UPDATE race_stages SET cum_distance=3240 WHERE stage_id=20;
UPDATE race_stages SET cum_distance=3356 WHERE stage_id=21;

UPDATE race_results r
JOIN race_stages s
ON s.stage_id = r.stage_id
SET rider_speed = (s.cum_distance/r.rider_time*3600)
WHERE r.race_result_type_id = 2;